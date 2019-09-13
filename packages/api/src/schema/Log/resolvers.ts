import { Log } from '@mishguru/mishmeta'

import { Context } from '../../types'

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

export { resolvers }
