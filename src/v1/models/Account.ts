import mongoose from "mongoose";
import IAccount from "../tools/interfaces/IAccount";
// import timestamps from "mongoose-timestamp";
const timestamps = require("mongoose-timestamp");

const AccountSchema = new mongoose.Schema({
  firstname: {
    type: mongoose.Schema.Types.String,
    required: false,
    default: "",
    max: 50,
  },
  lastname: {
    type: mongoose.Schema.Types.String,
    required: false,
    default: "",
    max: 50,
  },
  phone: {
    type: mongoose.Schema.Types.String,
    required: false,
    default: "",
    max: 20,
  },
  avatar: {
    type: mongoose.Schema.Types.String,
    required: false,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
AccountSchema.plugin(timestamps);

AccountSchema.method("transform", function () {
  let obj = this.toObject() as IAccount;
  return {
    firstname: obj.firstname,
    lastname: obj.lastname,
    phone: obj.phone,
  };
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
