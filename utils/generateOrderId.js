module.exports = (latestOrder, userId) => {
  // 20200801-5f2357d43777271c4a2a20bf-1
  let orderIdPostfix;
  const date = new Date();

  const orderIdPrefix = `${date.getFullYear()}${`0${date.getMonth()}`.slice(
    -2
  )}${`0${date.getDate()}`.slice(-2)}`;

  if (latestOrder && latestOrder.orderId.startsWith(orderIdPrefix)) {
    orderIdPostfix = `${
      parseInt(latestOrder.orderId.match(/-[0-9a-z]+/gi)[1].substr(1)) + 1
    }`;
  } else {
    orderIdPostfix = 1;
  }

  return `${orderIdPrefix}-${userId}-${`000${orderIdPostfix}`.slice(-4)}`;
};
