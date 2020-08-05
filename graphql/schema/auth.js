module.exports = {
  userType: `
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
  `,
  authDataType: `
  type AuthData {
    token: String!
  }
  `,
  registerInput: `
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
    address: String!
  }
  `,
  loginInput: `
  input LoginInput {
    email: String!
    password: String!
  }
  `,
  login: `
  login(input:LoginInput):AuthData!
  `,
  loadUser: `
  loadUser:User!
  `,
  register: `
  register(input:RegisterInput):AuthData!
  `,
};
