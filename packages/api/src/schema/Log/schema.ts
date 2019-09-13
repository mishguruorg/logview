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

const typeMutation = `
  redispatch(id: ID!): Log
`

const typeQuery = `
  logs(ids: [ID!]!): [Log]
  searchLogs(input: SearchLogsInput!): SearchLogsResult!
`

const typeSubscription = `
  searchLogs(input: SearchLogsInput!): SearchLogsResult!
`

export { type, typeMutation, typeQuery, typeSubscription }
