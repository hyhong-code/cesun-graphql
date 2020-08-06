import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getUserOrder } from "../../actions/order";
import { createForm } from "../../actions/form";

const INITIAL_STATE = {
  product: "",
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
    product,
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
        order.orders.reduce((uniqueProducts, curOrder) => {
          if (
            !uniqueProducts
              .map((product) => product._id)
              .includes(curOrder.product._id)
          ) {
            return [
              ...uniqueProducts,
              { _id: curOrder.product._id, name: curOrder.product.name },
            ];
          } else {
            return uniqueProducts;
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
    console.log(user.isAuthenticated, formData);
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
          <select name="product" value={product} onChange={handleChange}>
            <option>Select a product</option>
            {purchasedProducts.map((product) => (
              <option key={product._id} value={product._id}>
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
