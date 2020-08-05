const { buildSchema } = require("graphql");

const userSchema = require("./user");
const productSchema = require("./product");

module.exports = buildSchema(`
  ${userSchema.UserType}
  ${userSchema.AuthDataType}
  ${userSchema.RegisterInput}
  ${userSchema.LoginInput}
  ${userSchema.UpdateInput}

  ${productSchema.ProductType}
  ${productSchema.ProductInput}

  type RootQuery {
    ${userSchema.login}
    ${userSchema.loadUser}

    ${productSchema.getProduct}
    ${productSchema.listProducts}
  }

  type RootMutation {
    ${userSchema.register}
    ${userSchema.updateUser}
    ${userSchema.deleteUser}

    ${productSchema.createProduct}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
