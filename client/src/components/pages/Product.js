import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getProduct } from "../../actions/product";

const Product = ({ match, getProduct, product }) => {
  useEffect(() => {
    const slug = match.params.slug;
    getProduct(slug);
  }, [match, getProduct]);

  return (
    <div>
      <h1>Product</h1>
      <p>{JSON.stringify(product.selectedProduct)}</p>
    </div>
  );
};

const mapStateToProps = ({ product }) => ({ product });

export default connect(mapStateToProps, { getProduct })(Product);
