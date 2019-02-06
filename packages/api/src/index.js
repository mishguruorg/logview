import meta from '@mishguru/mishmeta'
import { GraphQLServer } from 'graphql-yoga'
import { getMetaDbCredentials } from '@mishguru/commandquery'
import { GraphQLDateTime } from 'graphql-iso-date'
import delay from 'delay'

import withPagination from './withPagination'

import { key } from './dataloader/key'
import createDataloader from './dataloader/createDataloader'

const typeDefs = `
  scalar DateTime

  type Log {
    id: Int,
    createdAt: DateTime,
    updatedAt: DateTime,
    userId: Int,
    info: String,
    name: String,
    jsonString: String,
    readAt: DateTime,
  }

  type Cursors {
    hasNext: Boolean!
    hasPrevious: Boolean!
    before: String
    after: String
  }

  input FilterInput {
    last: Int!,
    after: String,
    before: String,
    createdBefore: DateTime
    createdAfter: DateTime
    userId: [Int],
    name: [String]
    info: String
    jsonString: String
  }

  type FilterResult {
    results: [Log]
    cursors: Cursors!
  }

  type Query {
    log(id: Int!): Log
    logs(ids: [Int!]!): [Log]
    filter(input: FilterInput!): FilterResult!
  }

  type Subscription {
    filter(input: FilterInput!): FilterResult!
  }
`

const filterLogs = (input) => {
  const {
    last,
    after,
    before,
    createdBefore,
    createdAfter,
    userId,
    name,
    info,
    jsonString
  } = input

  const where = {}
  if (userId != null) {
    where.userId = { $in: userId }
  }
  if (name != null) {
    where.name = { $in: name }
  }
  if (info != null) {
    where.info = { $like: info }
  }
  if (jsonString != null) {
    where.jsonString = { $like: jsonString }
  }
  if (createdBefore != null) {
    if (where.createdAt == null) {
      where.createdAt = {}
    }
    where.createdAt['$lt'] = createdBefore
  }
  if (createdAfter != null) {
    if (where.createdAt == null) {
      where.createdAt = {}
    }
    where.createdAt['$gt'] = createdAfter
  }

  return meta.Log.paginate({
    attributes: ['id'],
    where: where,
    raw: true,
    desc: true,
    limit: last,
    after,
    before
  })
}

const resolvers = {
  DateTime: GraphQLDateTime,
  Log: {
    id: (log) => log.id,
    createdAt: (log, _, ctx) => ctx.data.Log.load(key(log.id, 'createdAt')),
    updatedAt: (log, _, ctx) => ctx.data.Log.load(key(log.id, 'updatedAt')),
    userId: (log, _, ctx) => ctx.data.Log.load(key(log.id, 'userId')),
    info: (log, _, ctx) => ctx.data.Log.load(key(log.id, 'info')),
    name: (log, _, ctx) => ctx.data.Log.load(key(log.id, 'name')),
    jsonString: (log, _, ctx) => ctx.data.Log.load(key(log.id, 'jsonString')),
    readAt: (log, _, ctx) => ctx.data.Log.load(key(log.id, 'readAt'))
  },
  Query: {
    log: async (_, args) => {
      const { id } = args
      return { id }
    },
    logs: async (_, args) => {
      const { ids } = args
      return ids.map((id) => ({ id }))
    },
    filter: async (_, args) => {
      return filterLogs(args.input)
    }
  },
  Subscription: {
    filter: {
      subscribe: (_, args) => {
        const { input } = args

        let done = false
        let before = input.before

        const getNextLogs = async () => {
          const { results, cursors } = await filterLogs({ ...input, before })

          if (results.length === 0 && done === false) {
            await delay(2000)
            return getNextLogs()
          }

          before = cursors.before
          return { results, cursors }
        }

        return {
          async next () {
            return {
              value: {
                filter: await getNextLogs()
              },
              done
            }
          },
          async return () {
            done = true
            return {
              value: undefined,
              done
            }
          },
          async throw (error) {
            throw error
          },
          [Symbol.asyncIterator] () {
            return this
          }
        }
      }
    }
  }
}

meta.init({ ...getMetaDbCredentials(), verbose: true }).then(() => {
  // initialise pagination
  withPagination()(meta.Log)

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: () => ({
      data: createDataloader()
    })
  })

  const IS_PRODUCTION = process.env.NODE_ENV !== 'development'

  server.express.use((req, res, next) => {
    if (
      IS_PRODUCTION &&
      req.method === 'POST' &&
      req.headers.authorization !== 'undergo-unblock-wobbling-undercoat-snowbound-swoosh-fame'
    ) {
      res.status(401).json({ error: 'Invalid authorization header.' })
      return
    }

    next()
  })

  server.start(() => console.log('Server is running on localhost:4000'))
})
