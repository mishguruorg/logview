import { Context } from '../../types'
import createDb from '../../createDb'

interface RedispatchArgs {
  id: string,
}

const mutations = {
  redispatch: async (_: void, args: RedispatchArgs, ctx: Context) => {
    const { dispatch } = ctx
    const { id } = args

    const db = createDb({})
    ctx.db = db

    const [type, payloadString] = await Promise.all([
      db.LogByMessageId.load<string>(id, 'name'),
      db.LogByMessageId.load<string>(id, 'payload'),
    ])

    const payload = JSON.parse(payloadString)

    const message = await dispatch({
      type,
      payload,
    })

    return message.id
  },
}

export { mutations }
