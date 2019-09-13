import { Log } from '@mishguru/mishmeta'
import delay from 'delay'

import { Context } from '../../types'
import createDb from '../../createDb'

import searchLogs from './impl/searchLogs'

interface SearchLogsResult {
  results: Log[],
  cursors: {
    hasNext: boolean,
    beforeID?: string,
    afterID?: string,
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

export { subscriptions }
