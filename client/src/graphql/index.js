import productQueries from "./product";
import userQueries from "./user";
import orderQueries from "./order";

export default {
  ...productQueries,
  ...userQueries,
  ...orderQueries,
  config: () => ({
    headers: {
      "Content-Type": "application/json",
    },
  }),
};
