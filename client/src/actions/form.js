const axios = require("axios");

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createForm = (isAuth = false, formData) => async (dispatch) => {
  const postUrl = isAuth ? "/api/v1/forms/auth" : "/api/v1/forms/guest";
  try {
    const res = await axios.post(postUrl, formData, config);
    console.log(res.data.data.form);
  } catch (error) {
    console.error(error.response);
  }
};
