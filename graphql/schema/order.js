module.exports = {
  OrderType: `
  type Order {
    _id: ID!
    orderId: String!
    user: User!
    product: Product!
    sku: String!
    price: Float!
    createdAt: String!
  }
  `,
  getUserOrder: `
  getUserOrder(orderId:ID!):Order!
  `,
  listUserOrders: `
  listUserOrders:[Order!]!
  `,
  createOrder: `
  createOrder(productId:ID!):Order!
  `,
};
