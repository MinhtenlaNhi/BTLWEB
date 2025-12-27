const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
  parentId: {
    type: String,
    default: ""
  },
  thumbnail: String,
  title: String,
  description: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true
    }
  },
  
  {
    timestamps: true
  }
);
const productCategory = mongoose.model("productCategory", productCategorySchema, "product-categories");

module.exports = productCategory;

