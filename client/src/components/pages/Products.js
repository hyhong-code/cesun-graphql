import React, { useEffect } from "react";
import { connect } from "react-redux";

import { listProducts } from "../../actions/product";

const Products = ({ products, listProducts, history }) => {
  useEffect(() => {
    listProducts();
  }, [listProducts]);

  const handleClick = (slug) => {
    history.push(`/product/${slug}`);
  };

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          {product.slug}
          <button onClick={() => handleClick(product.slug)}>
            VIEW PRODUCT
          </button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ product: { products } }) => ({ products });

export default connect(mapStateToProps, { listProducts })(Products);
