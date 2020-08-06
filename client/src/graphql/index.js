import productQueries from "./product";
import userQueries from "./user";

export default {
  ...productQueries,
  ...userQueries,
  config: () => ({
    headers: {
      "Content-Type": "application/json",
    },
  }),
};
