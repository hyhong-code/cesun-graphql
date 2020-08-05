const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    isVerified: Boolean!
    level: String!
    role: String!
    address: String!
    createdAt: String!
  }

  type AuthData {
    token: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
    address: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type RootQuery {
    login(input:LoginInput):AuthData!
    loadUser:User!
  }

  type RootMutation {
    register(input:RegisterInput):AuthData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
