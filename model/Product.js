const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name for product."],
      unique: [true, "Product name must be unique."],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a description for product."],
    },
    price: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
      required: [true, "Please provide a price for product."],
      validate: {
        validator: (v) => parseFloat(v) > 0,
        message: "Price must be greater than 0.",
      },
    },
    sku: {
      type: String,
      required: [true, "Please provide a sku for product."],
    },
    status: {
      type: String,
      enum: ["PRE_ORDER", "ON_SALE", "OUT_OF_STOCK"],
      default: "PRE_ORDER",
    },
    photos: {
      type: [
        {
          type: String,
        },
      ],
    },
    slug: {
      type: String,
      unique: [true, "Product slug must be unique."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { getters: true } }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("Product", productSchema);
