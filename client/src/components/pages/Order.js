import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getUserOrder } from "../../actions/order";

const Orders = ({ match, order, getUserOrder }) => {
  useEffect(() => {
    getUserOrder(match.params.id);
  }, [match.params.id, getUserOrder]);

  return (
    <div>
      <h1>Order</h1>
      {!!Object.keys(order.selectedOrder).length && (
        <p>{JSON.stringify(order.selectedOrder)}</p>
      )}
    </div>
  );
};

const mapStateToProps = ({ order }) => ({ order });

export default connect(mapStateToProps, { getUserOrder })(Orders);
