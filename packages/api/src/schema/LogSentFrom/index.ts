import meta from '@mishguru/mishmeta'

import { Context } from '../../types'
import createDb from '../../createDb'

interface LogSentFrom {
  name: string,
}

const type = `
  type LogSentFrom {
    name: String!
  }
`

const typeQuery = `
  logSentFroms: [LogSentFrom!]!
`

const resolvers = {
  LogSentFrom: {
    name: (log: LogSentFrom) => log.name,
  },
}

const queries = {
  logSentFroms: async (_self: void, _args: any, ctx: Context) => {
    if (ctx.authorized !== true) {
      throw new Error('Invalid authorization!')
    }

    ctx.db = createDb({})

    const logSentFroms = await meta.Log.findAll({
      raw: true,
      attributes: [
        [meta.sequelize.fn('DISTINCT', meta.sequelize.col('sentFrom')), 'name'],
      ],
      where: {
        sentFrom: { $ne: null }
      }
    })

    return logSentFroms
  },
}

export { type, typeQuery, resolvers, queries }
