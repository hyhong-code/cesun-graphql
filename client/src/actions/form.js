import axios from "axios";

import gql from "../graphql/index";

export const createForm = (isAuth = false, formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/graphql",
      isAuth ? gql.createAuthForm(formData) : gql.createGuestForm(formData),
      gql.config()
    );
    console.log(res.data);
  } catch (error) {
    console.error(error.response);
  }
};
