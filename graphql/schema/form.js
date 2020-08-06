module.exports = {
  FormType: `
  type Form {
    _id: ID!
    firstName: String!
    lastName: String!
    subject: String!
    message: String!
    images: [String!]!
    amazonOrderId: String
    isLoggedIn: Boolean!
    user: User
    product: Product

  }
  `,
  GuestFormInput: `
  input GuestFormInput {
    subject: String!
    message: String!
    firstName: String!
    lastName: String!
    amazonOrderId: String
  }
  `,
  AuthFormInput: `
  input AuthFormInput {
    product: ID!
    subject: String!
    message: String
  }
  `,
  createGuestForm: `
  createGuestForm(input:GuestFormInput):Form!
  `,
  createAuthForm: `
  createAuthForm(input:AuthFormInput):Form!
  `,
};
