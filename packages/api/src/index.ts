import GraphQLJSON from 'graphql-type-json'
import delay from 'delay'
import meta, { Log } from '@mishguru/mishmeta'
import { GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLServer } from 'graphql-yoga'

import createDataloader from './dataloader/createDataloader'

const SECRET_KEY = 'undergo-unblock-wobbling-undercoat-snowbound-swoosh-fame'

const typeDefs = `
  scalar JSON
  scalar DateTime

  type Log {
    id: ID
    userId: Int
    parent: Log
    sentFrom: String
    sentAt: DateTime
    type: String
    payload: JSON
  }

  type Cursors {
    hasNext: Boolean!
    before: ID
    after: ID
  }

  input SearchLogsInput {
    last: Int!
    after: ID
    before: ID
    sentFrom: [String]
    sentBefore: DateTime
    sentAfter: DateTime
    userId: [Int]
    type: [String]
    payload: String
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

type SearchLogsInput = {
  last: number
  after?: string
  before?: string
  sentBefore?: Date
  sentAfter?: Date
  sentFrom?: string[]
  userId?: number[]
  type?: string[]
  payload?: string
}

const searchLogs = async (input: SearchLogsInput) => {
  const {
    last,
    after,
    before,
    sentFrom,
    sentBefore,
    sentAfter,
    userId,
    type,
    payload
  } = input

  let desc = true

  const where: any = {}
  if (userId != null) {
    where.userId = { $in: userId }
  }
  if (type != null) {
    where.name = { $in: type }
  }
  if (payload != null) {
    where.payload = { $like: payload }
  }
  if (sentBefore != null) {
    if (where.createdAt == null) {
      where.createdAt = {}
    }
    where.createdAt['$lt'] = sentBefore
  }
  if (sentAfter != null) {
    if (where.createdAt == null) {
      where.createdAt = {}
    }
    where.createdAt['$gt'] = sentAfter
  }

  if (after != null) {
    where.id = { $lt: after }
    desc = true
  }

  if (before != null) {
    where.id = { $gt: before }
    desc = false
  }

  const allResults = await meta.Log.findAll({
    attributes: ['id'],
    where: where,
    raw: true,
    order: [['id', desc ? 'DESC' : 'ASC']],
    limit: last + 1
  })

  const results = allResults.slice(0, last)

  if (desc === false) {
    results.reverse()
  }

  return {
    results,
    cursors: {
      hasNext: allResults.length > last,
      before: results.length > 0 ? results[0].id : null,
      after: results.length > 0 ? results[results.length - 1].id : null,
    },
  }
}

type Context = {
  authorized: boolean,
  db: {
    Log: {
      load: (id: number, column: string) => Promise<any>
    }
  }
}

type SearchLogsResult = {
  results: Log[]
  cursors: {
    hasNext: boolean
    before?: number
    after?: number
  }
}

const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
  Log: {
    type: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.Log.load(log.id, 'name')
    },
    payload: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      const payload = await db.Log.load(log.id, 'payload')
      return JSON.parse(payload)
    },
    parent: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      const parentId = await db.Log.load(log.id, 'parentId')

      if (parentId == null) {
        return null
      }

      return {
        id: parentId,
        __typename: 'Log',
      }
    },
    userId: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.Log.load(log.id, 'userId')
    },
    sentFrom: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.Log.load(log.id, 'sentFrom')
    },
    sentAt: async (log: Log, _: void, ctx: Context) => {
      const { db } = ctx
      return db.Log.load(log.id, 'createdAt')
    },
  },
  Query: {
    logs: async (_: void, args: any, ctx: Context) => {
      if (ctx.authorized !== true) {
        throw new Error('Invalid authorization!')
      }
      const { ids } = args
      return ids.map((id: number) => ({ id }))
    },
    searchLogs: async (_: void, args: any, ctx: Context) => {
      if (ctx.authorized !== true) {
        throw new Error('Invalid authorization!')
      }
      return searchLogs(args.input)
    }
  },
  Subscription: {
    searchLogs: {
      subscribe: (_: void, args: any, ctx: Context) => {
        if (ctx.authorized !== true) {
          throw new Error('Invalid authorization!')
        }

        const { input } = args

        let done = false
        let before = input.before

        const getNextLogs = async (): Promise<SearchLogsResult> => {
          const { results, cursors } = await searchLogs({ ...input, before })

          if (results.length === 0 && done === false) {
            await delay(2000)
            return getNextLogs()
          }

          before = cursors.before
          return { results, cursors }
        }

        return {
          async next() {
            return {
              value: {
                searchLogs: await getNextLogs()
              },
              done
            }
          },
          async return() {
            done = true
            return {
              value: <any>undefined,
              done
            }
          },
          async throw(error: Error) {
            throw error
          },
          [Symbol.asyncIterator]() {
            return this
          }
        }
      }
    }
  }
}

meta.connect().then(() => {
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (req) => {
      let authorization

      if (req.connection) {
        authorization = req.connection.context.authorization
      } else if (req.request) {
        authorization = req.request.headers.authorization
      }

      const authorized = authorization === SECRET_KEY

      return {
        authorized,
        db: createDataloader()
      }
    }
  })

  const IS_PRODUCTION = process.env.NODE_ENV !== 'development'

  server.start(({ port }) => console.log(`Server is listening on ${port}`))
})
