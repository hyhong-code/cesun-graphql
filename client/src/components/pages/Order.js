import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getOrder } from "../../actions/order";

const Orders = ({ match, order, getOrder }) => {
  useEffect(() => {
    getOrder(match.params.id);
  }, [match.params.id, getOrder]);

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

export default connect(mapStateToProps, { getOrder })(Orders);
