const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    product_id: String,
    reviewer: [
      {
        user_id: String,
        rating: String,
        comment: String,
        createdAt: Date,
        deleted: {
            type: Boolean,
            default: false
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);
const review = mongoose.model("review", reviewSchema, "reviews");

module.exports = review;
