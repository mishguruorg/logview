import { GraphQLSchema } from 'graphql'
import GraphQLDir from '@mishguru/graphqldir'
import { makeExecutableSchema } from 'graphql-tools'

const graphqldir = new GraphQLDir(__dirname)
const schema = graphqldir.makeSchema()

let executableSchema: GraphQLSchema
try {
  executableSchema = makeExecutableSchema(schema)
} catch (err) {
  console.error(schema.typeDefs)
  throw err
}

export default executableSchema
