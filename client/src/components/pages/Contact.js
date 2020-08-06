import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getUserOrder } from "../../actions/order";
import { createForm } from "../../actions/form";

const INITIAL_STATE = {
  productId: "",
  subject: "",
  message: "",
  amazonOrderId: "",
  firstName: "",
  lastName: "",
};

const Contact = ({ user, order, getUserOrder, createForm }) => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [formData, setFormData] = useState(INITIAL_STATE);

  const {
    productId,
    subject,
    message,
    amazonOrderId,
    firstName,
    lastName,
  } = formData;

  useEffect(() => {
    getUserOrder();
  }, [getUserOrder]);

  useEffect(() => {
    if (order.orders.length) {
      setPurchasedProducts(
        order.orders.reduce((orderedProducts, cur) => {
          if (
            !orderedProducts
              .map((product) => product.id)
              .includes(cur.productId.id)
          ) {
            return [
              ...orderedProducts,
              { id: cur.productId.id, name: cur.productId.name },
            ];
          } else {
            return orderedProducts;
          }
        }, [])
      );
    }
  }, [order.orders]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (user.isAuthenticated) {
      createForm(true, formData);
    } else {
      createForm(false, formData);
    }
  };

  return (
    <div>
      <h1>Contact</h1>
      {user.isAuthenticated && order.orders.length ? (
        <form onSubmit={handleSubmit}>
          <select name="productId" value={productId} onChange={handleChange}>
            <option>Select a product</option>
            {purchasedProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Subject"
          />
          <input
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Message"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Subject"
          />
          <input
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Message"
          />
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          <input
            type="text"
            name="amazonOrderId"
            value={amazonOrderId}
            onChange={handleChange}
            placeholder="amazonOrderId (optional)"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = ({ user, order }) => ({ user, order });

export default connect(mapStateToProps, { getUserOrder, createForm })(Contact);
