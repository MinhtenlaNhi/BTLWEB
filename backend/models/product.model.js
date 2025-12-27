const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    product_category_id: {
      type: String,
      default: "",
    },
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    title: String,
    description: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    price: Number,
    deleteAt: Date,
    position: Number,
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    featured: {
      type: String,
      default: "0"
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },

  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
