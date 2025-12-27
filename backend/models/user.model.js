const mongoose = require("mongoose");
const tokenUser = require("../helpers/tokenHelper");
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: () => {
            return tokenUser.tokenRandom(30)
        }
    },
    phone: String,
    avartar: String,
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active"
    },
    deletedAt: Date
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", userSchema, "users");

module.exports = user;
