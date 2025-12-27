const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    deleted: {
      type: Boolean,
      default: false,
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
          default: Date.now,
        },
      },
    ],
    permissions: {
      type: Array,
      default: [],
    },
  },

  {
    timestamps: true,
  }
);
const role = mongoose.model("role", roleSchema, "roles");

module.exports = role;
