const { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type Query {
  hello: String,
  age: Int
  user(email: String!, password: String!): [User]!
}
type User {
    userId: String
    firstName: String
    lastName: String
    email: String!
    password: String
    age: Int
    address: Address
    cardId: [String!]
    error: String
    token: String
}

type Address {
    addressLine1: String!
    addressLine2: String
    city: String!
    parish: String!
    zip: String!
    country: String!
}
`);

module.exports = { schema }