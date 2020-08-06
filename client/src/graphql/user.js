export default {
  register: (formData) => ({
    query: `
    mutation ($email:String!,$password:String!,$confirmPassword:String!,$firstName:String!,$lastName:String!,$address:String!){
      register(input:{email:$email,password:$password,confirmPassword:$confirmPassword,firstName:$firstName,lastName:$lastName,address:$address})
      {
        token
      }
    }
    `,
    variables: { ...formData },
  }),
  login: (formData) => ({
    query: `
    query ($email:String!,$password:String!){
      login(input:{email:$email,password:$password})
      {
        token
      }
    }
    `,
    variables: { ...formData },
  }),
  loadUser: () => ({
    query: `
    query {
      loadUser {
          _id
          firstName
          lastName
          email
          isVerified
          level
          role
          address
          createdAt
      }
    }
    `,
  }),
};
