const { buildSchema } = require("graphql");

const userSchema = require("./user");
const productSchema = require("./product");
const orderSchema = require("./order");
const formSchema = require("./form");

module.exports = buildSchema(`
  ${userSchema.UserType}
  ${userSchema.AuthDataType}
  ${userSchema.RegisterInput}
  ${userSchema.LoginInput}
  ${userSchema.UpdateInput}

  ${productSchema.ProductType}
  ${productSchema.ProductInput}

  ${orderSchema.OrderType}

  ${formSchema.FormType}
  ${formSchema.GuestFormInput}
  ${formSchema.AuthFormInput}

  type RootQuery {
    ${userSchema.login}
    ${userSchema.loadUser}

    ${productSchema.getProduct}
    ${productSchema.listProducts}

    ${orderSchema.getUserOrder}
    ${orderSchema.listUserOrders}
  }

  type RootMutation {
    ${userSchema.register}
    ${userSchema.updateUser}
    ${userSchema.deleteUser}

    ${productSchema.createProduct}

    ${orderSchema.createOrder}

    ${formSchema.createGuestForm}
    ${formSchema.createAuthForm}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
