import mongoose from "mongoose";
const timestamps = require("mongoose-timestamp");

const UserServiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: -1,
  },
});
UserServiceSchema.plugin(timestamps);

const UserService = mongoose.model("UserService", UserServiceSchema);

export default UserService;
