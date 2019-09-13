import { Context } from '../../types'
import createDb from '../../createDb'

import searchLogs from './impl/searchLogs'

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

export { queries }
