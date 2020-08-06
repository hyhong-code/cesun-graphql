import productQueries from "./product";
import userQueries from "./user";
import orderQueries from "./order";
import formQueries from "./form";

export default {
  ...productQueries,
  ...userQueries,
  ...orderQueries,
  ...formQueries,
  config: () => ({
    headers: {
      "Content-Type": "application/json",
    },
  }),
};
