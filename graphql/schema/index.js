const { buildSchema } = require("graphql");

const authSchema = require("./auth");

module.exports = buildSchema(`
  ${authSchema.userType}
  ${authSchema.authDataType}
  ${authSchema.registerInput}
  ${authSchema.loginInput}

  type RootQuery {
    ${authSchema.login}
    ${authSchema.loadUser}
  }

  type RootMutation {
    ${authSchema.register}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
