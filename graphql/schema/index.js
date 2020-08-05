const { buildSchema } = require("graphql");

const authSchema = require("./auth");
const productSchema = require("./product");

module.exports = buildSchema(`
  ${authSchema.UserType}
  ${authSchema.AuthDataType}
  ${authSchema.RegisterInput}
  ${authSchema.LoginInput}


  ${productSchema.ProductType}
  ${productSchema.ProductInput}

  type RootQuery {
    ${authSchema.login}
    ${authSchema.loadUser}
  }

  type RootMutation {
    ${authSchema.register}
    ${productSchema.createProduct}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
