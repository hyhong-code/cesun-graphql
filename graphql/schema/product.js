module.exports = {
  ProductType: `
  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    sku: String!
    slug: String!
    status: String!
    photos: [String!]!
  }
  `,
  ProductInput: `
  input ProductInput {
    name: String!
    description: String!
    price: Float!
    sku: String!
  }
  `,
  createProduct: `
  createProduct(input:ProductInput):Product!
  `,
  getProduct: `
  getProduct(productId:ID!):Product!
  `,
  listProducts: `
  listProducts:[Product!]!
  `,
};
