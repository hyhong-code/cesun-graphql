const User = require("../../model/User");

module.exports = {
  login: async ({ input: { email, password } }, req) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      if (!(await user.correctPassword(password))) {
        throw new Error("Invalid credentials");
      }
      return { token: user.genJwtToken() };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  register: async ({ input }, req) => {
    try {
      const user = await User.create(input);
      return { token: user.genJwtToken() };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  loadUser: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");
      return req.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
