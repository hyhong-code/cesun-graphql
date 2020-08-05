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
  updateUser: async ({ input }, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");
      const user = await User.findByIdAndUpdate(req.user.id, input, {
        new: true,
        runValidators: true,
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteUser: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");
      const user = await User.findByIdAndDelete(req.user.id);
      return user.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
