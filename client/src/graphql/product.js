export default {
  listProducts: () => ({
    query: `
    query {
      listProducts {
        _id
        name
        description
        price
        sku
        slug
        status
        photos
      }
    }
    `,
  }),
  getProduct: (slug) => ({
    query: `
    query($slug:String!) {
      getProduct(slug:$slug) {
        _id
        name
        description
        price
        sku
        slug
        status
        photos
      }
    }
    `,
    variables: {
      slug,
    },
  }),
};
