const mongoose = require("mongoose");
const token = require("../helpers/tokenHelper");


const accountSchema = new mongoose.Schema(
  {
    avartar: String,
    fullName: String,
    email: String,
    password: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
    token: {
      type: String,
      default: () => {
        return token.tokenRandom(20)
      }
    },
    phone: String,
    role_id: String,
    status: String,
  },

  {
    timestamps: true,
  }
);
const accountModel = mongoose.model(
  "accountModel",
  accountSchema,
  "accounts"
);

module.exports = accountModel;
