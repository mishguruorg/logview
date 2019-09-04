import { GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON from 'graphql-type-json'

const type = `
  scalar JSON
  scalar DateTime
`

const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
}

export { type, resolvers }
