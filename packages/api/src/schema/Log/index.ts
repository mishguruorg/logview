import delay from 'delay'
import meta, { Log } from '@mishguru/mishmeta'

import { Context } from '../../types'
import createDb from '../../createDb'
import whereInNotIn from '../../whereInNotIn'

const type = `
  type Cursors {
    hasNext: Boolean!
    beforeID: ID
    afterID: ID
  }

  type Log {
    id: ID
    userId: ID
    parent: Log
    children: [Log]
    sentFrom: String
    sentAt: DateTime
    type: String
    payload: JSON
  }

  input SearchLogsInput {
    last: Int!
    afterDate: DateTime!

    beforeDate: DateTime

    afterID: ID
    beforeID: ID

    payload: String
    sentFrom: [String!]
    userId: [ID!]
    type: [String!]
  }

  type SearchLogsResult {
    results: [Log!]!
    cursors: Cursors!
  }
`

const typeQuery = `
  logs(ids: [ID!]!): [Log]
  searchLogs(input: SearchLogsInput!): SearchLogsResult!
`

const typeSubscription = `
  searchLogs(input: SearchLogsInput!): SearchLogsResult!
`

interface SearchLogsInput {
  last: number,
  beforeDate: Date,
  afterDate: Date,

  afterID?: string,
  beforeID?: string,

  payload?: string,
  sentFrom?: string[],
  userId?: string[],
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

  let replacements: Record<
  string,
  string | string[] | Date | number | number[] | boolean | boolean[]
  > = {
    afterDate,
    beforeDate,
    userId,
    type,
    afterID,
    beforeID,
  }

  let where: string[] = ['createdAt >= :afterDate']

  if (beforeDate != null) {
    where.push('createdAt <= :beforeDate')
  }

  if (payload != null) {
    const [, key, value] = payload.match(/([^:]+):(.*)/)
    where.push(`JSON_EXTRACT(payload, '$.${key}') = :payloadValue`)
    replacements.payloadValue = (() => {
      if (value === 'true') {
        return true
      } else if (value === 'false') {
        return false
      } else if (isNaN(parseInt(value, 10)) === false) {
        return parseInt(value, 10)
      } else {
        return value
      }
    })()
  }
  if (userId != null) {
    const { replacements: r, where: w } = whereInNotIn('userId', userId)
    replacements = { ...replacements, ...r }
    where = where.concat(w)
  }
  if (type != null) {
    const { replacements: r, where: w } = whereInNotIn('name', type)
    replacements = { ...replacements, ...r }
    where = where.concat(w)
  }
  if (sentFrom != null) {
    const { replacements: r, where: w } = whereInNotIn('sentFrom', sentFrom)
    replacements = { ...replacements, ...r }
    where = where.concat(w)
  }

  if (afterID != null) {
    where.push('messageId < (:afterID)')
    desc = true
  }

  if (beforeID != null) {
    where.push('messageId > (:beforeID)')
    desc = false
  }

  const allResults = await meta.sequelize.query(
    `
SELECT /*+ MAX_EXECUTION_TIME(10000) */
  messageId
FROM ${meta.Log.tableName}
WHERE
  ${where.join(' AND\n  ')}
ORDER BY createdAt ${desc ? 'DESC' : 'ASC'}
LIMIT ${last + 1}`,
    {
      type: meta.sequelize.QueryTypes.SELECT,
      replacements,
    },
  )

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

interface SearchLogsResult {
  results: Log[],
  cursors: {
    hasNext: boolean,
    beforeID?: string,
    afterID?: string,
  },
}

const resolvers = {
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
}

const queries = {
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
}

const subscriptions = {
  searchLogs: {
    subscribe: (_: void, args: any, ctx: Context) => {
      if (ctx.authorized !== true) {
        throw new Error('Invalid authorization!')
      }

      const { input } = args

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
}

export { type, typeQuery, typeSubscription, resolvers, queries, subscriptions }
