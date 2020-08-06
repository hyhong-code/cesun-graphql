export default {
  createGuestForm: (formData) => ({
    query: `
    mutation($subject:String!,$message:String!,$firstName:String!,$lastName:String!,$amazonOrderId:String) {
      createGuestForm(input:{subject:$subject, message:$message, firstName:$firstName, lastName: $lastName, amazonOrderId:$amazonOrderId})
      {
        _id
        firstName
        lastName
        subject
        message
        images
        amazonOrderId
        isLoggedIn
      }
    }
    `,
    variables: { ...formData },
  }),
  createAuthForm: (formData) => ({
    query: `
    mutation($subject:String!,$message:String!,$product:ID!) {
      createAuthForm(input:{subject:$subject, message:$message,product:$product})
      {
        _id
        firstName
        lastName
        subject
        message
        images
        amazonOrderId
        isLoggedIn
        product {
          _id
        }
        user {
          _id
        }
      }
    }
    `,
    variables: { ...formData },
  }),
};
