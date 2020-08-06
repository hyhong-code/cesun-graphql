export default {
  listUserOrders: () => ({
    query: `
    query {
      listUserOrders {
        _id
        orderId
        user {
          _id
        }
        product {
          _id
          name
        }
        sku
        price
        createdAt
      }
    }
    `,
  }),
  getUserOrder: (orderId) => ({
    query: `
    query($orderId:ID!) {
      getUserOrder(orderId:$orderId) {
        _id
        orderId
        user {
          _id
        }
        product {
          _id
        }
        sku
        price
        createdAt
      }
    }
    `,
    variables: { orderId },
  }),
};
