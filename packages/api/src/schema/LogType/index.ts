import meta, { LogType } from '@mishguru/mishmeta'

import { Context } from '../../types'
import createDb from '../../createDb'

const type = `
  type LogType {
    type: String!
    firstDispatchedAt: DateTime!
    lastDispatchedAt: DateTime
  }
`

const typeQuery = `
  logTypes: [LogType!]!
`

const resolvers = {
  LogType: {
    type: (log: LogType) => log.id,
    firstDispatchedAt: async (log: LogType, _: void, ctx: Context) => {
      const { db } = ctx
      return db.LogType.load<Date>(log.id, 'createdAt')
    },
    lastDispatchedAt: async (log: LogType, _: void, ctx: Context) => {
      const { db } = ctx
      return db.LogType.load<Date>(log.id, 'lastDispatchedAt')
    },
  },
}

const queries = {
  logTypes: async (_self: void, _args: any, ctx: Context) => {
    if (ctx.authorized !== true) {
      throw new Error('Invalid authorization!')
    }

    ctx.db = createDb({})

    const logTypes = await meta.LogType.findAll({
      raw: true,
      attributes: ['id'],
    })

    return logTypes
  },
}

export { type, typeQuery, resolvers, queries }
