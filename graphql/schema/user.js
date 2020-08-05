module.exports = {
  UserType: `
  type User {
    _id: ID!
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
  AuthDataType: `
  type AuthData {
    token: String!
  }
  `,
  RegisterInput: `
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
    address: String!
  }
  `,
  LoginInput: `
  input LoginInput {
    email: String!
    password: String!
  }
  `,
  UpdateInput: `
  input UpdateInput {
    email: String
    firstName: String
    lastName: String
    address: String
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
  updateUser: `
  updateUser(input:UpdateInput):User!
  `,
  deleteUser: `
  deleteUser:ID!
  `,
};
