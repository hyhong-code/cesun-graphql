const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide an email."],
    unique: [true, "This email is already taken."],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Please provide a valid email address.",
    },
  },
  amazonOrderId: {
    type: String,
    trim: true,
  },
  points: {
    type: Number,
    required: [true],
    default: 0,
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, "Please provide a first name."],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Please provide a last name."],
  },
  address: {
    type: String,
    required: [true, "Please provide an address."],
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => validator.isMobilePhone(v),
      message: "Please provide a valid phone number.",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [8, "A password must be at least 8 characters long"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "Passwords do not match.",
    },
  },
  passwordResetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    enum: ["PIONEER", "CESUNER"],
    default: "CESUNER",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password upon creating a user, or resetting password
userSchema.pre("save", async function (next) {
  if (!this.isNew && !this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare given plain password with user's password
userSchema.methods.correctPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Generate a jwt token with user id as payload
userSchema.methods.genJwtToken = function () {
  const payload = { id: this.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
