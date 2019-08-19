import GraphQLJSON from 'graphql-type-json'
import delay from 'delay'
import meta, { Log } from '@mishguru/mishmeta'
import { GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLServer } from 'graphql-yoga'
import jwksRsa from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import createDb, { Db } from './createDb'

const typeDefs = `
  scalar JSON
  scalar DateTime

  type Log {
    id: ID
    userId: Int
    parent: Log
    children: [Log]
    sentFrom: String
    sentAt: DateTime
    type: String
    payload: JSON
  }

  type Cursors {
    hasNext: Boolean!
    beforeID: ID
    afterID: ID
  }

  input SearchLogsInput {
    last: Int!
    afterDate: DateTime!

    beforeDate: DateTime

    afterID: ID
    beforeID: ID

    payload: String
    sentFrom: [String]
    userId: [Int]
    type: [String]
  }

  type SearchLogsResult {
    results: [Log]!
    cursors: Cursors!
  }

  type Query {
    logs(ids: [ID!]!): [Log]
    searchLogs(input: SearchLogsInput!): SearchLogsResult!
  }

  type Subscription {
    searchLogs(input: SearchLogsInput!): SearchLogsResult!
  }
`

interface SearchLogsInput {
  last: number,
  beforeDate: Date,
  afterDate: Date,

  afterID?: string,
  beforeID?: string,

  payload?: string,
  sentFrom?: string[],
  userId?: number[],
  type?: string[],
}

const searchLogs = async (input: SearchLogsInput) => {
  const {
    last,
    beforeDate,
    afterDate,

    afterID,
    beforeID,

    payload,
    sentFrom,
    userId,
    type,
  } = input

  let desc = true

  const replacements: Record<string, string|string[]|Date|number|number[]> = {
    afterDate,
    beforeDate,
    userId,
    type,
    sentFrom,
    afterID,
    beforeID
  }

  const where: string[] = [
    'createdAt >= :afterDate',
  ]


  if (beforeDate != null) {
    where.push('createdAt <= :beforeDate')
  }

  if (payload != null) {
    const [key, value] = payload.split(':')

    const seq = meta.sequelize as any
    where.push(`JSON_EXTRACT(payload, '$.${key}') = :payloadValue`)
    replacements.payloadValue = value
  }
  if (userId != null) {
    where.push('userId IN (:userId)')
  }
  if (type != null) {
    where.push('name IN (:type)')
  }
  if (sentFrom != null) {
    where.push('sentFrom IN (:sentFrom)')
  }

  if (afterID != null) {
    where.push('messageId < (:afterID)')
    desc = true
  }

  if (beforeID != null) {
    where.push('messageId > (:beforeID)')
    desc = false
  }

  const allResults = await meta.sequelize.query(`
SELECT /*+ MAX_EXECUTION_TIME(1000) */
  messageId
FROM ${meta.Logs.tableName}
WHERE
  ${where.join(' AND\n  ')}
ORDER BY createdAt ${desc ? 'DESC' : 'ASC'}
LIMIT ${last + 1}`, {
    type: meta.sequelize.QueryTypes.SELECT,
    replacements
  })

  const results = allResults.slice(0, last)

  if (desc === false) {
    results.reverse()
  }

  return {
    results,
    cursors: {
      hasNext: allResults.length > last,
      beforeID: results.length > 0 ? results[0].messageId : null,
      afterID:
        results.length > 0 ? results[results.length - 1].messageId : null,
    },
  }
}

interface Context {
  authorized: boolean,
  db: Db,
}

interface SearchLogsResult {
  results: Log[],
  cursors: {
    hasNext: boolean,
    beforeID?: string,
    afterID?: string,
  },
}

const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
  Log: {
    id: async (log: Log) => {
      return log.messageId
    },
    type: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.LogByMessageId.load<string>(log.messageId, 'name')
    },
    payload: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      const payload = await db.LogByMessageId.load<string>(
        log.messageId,
        'payload',
      )
      return JSON.parse(payload)
    },
    parent: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      const parentId = await db.LogByMessageId.load<string>(
        log.messageId,
        'parentMessageId',
      )

      if (parentId == null) {
        return null
      }

      return {
        messageId: parentId,
      }
    },
    children: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      const children = await db.LogByParentMessageId.loadAll(
        log.messageId,
        'messageId',
      )
      return children.map((messageId) => ({ messageId }))
    },
    userId: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.LogByMessageId.load<number>(log.messageId, 'userId')
    },
    sentFrom: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.LogByMessageId.load<string>(log.messageId, 'sentFrom')
    },
    sentAt: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.LogByMessageId.load<string>(log.messageId, 'createdAt')
    },
  },
  Query: {
    logs: async (_: void, args: any, ctx: Context) => {
      if (ctx.authorized !== true) {
        throw new Error('Invalid authorization!')
      }

      ctx.db = createDb({})

      const { ids } = args
      return ids.map((messageId: string) => ({ messageId }))
    },
    searchLogs: async (_: void, args: any, ctx: Context) => {
      if (ctx.authorized !== true) {
        throw new Error('Invalid authorization!')
      }

      ctx.db = createDb({
        createdAt: {
          $gte: args.input.afterDate,
        },
      })

      return searchLogs(args.input)
    },
  },
  Subscription: {
    searchLogs: {
      subscribe: (_: void, args: any, ctx: Context) => {
        if (ctx.authorized !== true) {
          throw new Error('Invalid authorization!')
        }

        const { input } = args
        console.log('Subscription', input)

        ctx.db = createDb({
          createdAt: {
            $gte: args.input.afterDate,
          },
        })

        let done = false
        let beforeID = input.beforeID

        const getNextLogs = async (): Promise<SearchLogsResult> => {
          const { results, cursors } = await searchLogs({ ...input, beforeID })

          if (results.length === 0 && done === false) {
            await delay(2000)
            return getNextLogs()
          }

          beforeID = cursors.beforeID
          return { results, cursors }
        }

        return {
          async next () {
            return {
              value: {
                searchLogs: await getNextLogs(),
              },
              done,
            }
          },
          async return () {
            done = true
            return {
              value: undefined as any,
              done,
            }
          },
          async throw (error: Error) {
            throw error
          },
          [Symbol.asyncIterator] () {
            return this
          },
        }
      },
    },
  },
}

const AUTH0_CONFIG = {
  domain: 'mishguruadmin.auth0.com',
  audience: 'https://logview.mish.guru/',
}

const jwksClient = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${AUTH0_CONFIG.domain}/.well-known/jwks.json`,
})

const getKey = (header: any, callback: any) => {
  jwksClient.getSigningKey(header.kid, (error: Error, key: any) => {
    console.error(error)
    var signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

meta.connect().then(() => {
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async (req) => {
      let token
      if (req.connection) {
        token = req.connection.context.authorization.split(' ')[1]
      } else if (req.request) {
        token = req.request.headers.authorization.split(' ')[1]
      }

      try {
        const decoded = await promisify(jwt.verify.bind(jwt))(token, getKey, {
          audience: AUTH0_CONFIG.audience,
          issuer: `https://${AUTH0_CONFIG.domain}/`,
          algorithms: ['RS256'],
        })

        return {
          authorized: true
        }
      } catch (error) {
        return {
          authorized: false
        }
      }
    },
  })

  server.start(({ port }: { port: number }) =>
    console.log(`Server is listening on ${port}`),
  )
})
