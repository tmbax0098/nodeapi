import mongoose, { Schema } from "mongoose";

const { Types } = Schema;

const timestamps = require("mongoose-timestamp");

const PollSchema = new mongoose.Schema({
  title: {
    type: Types.String,
    required: true,
    max: 200,
  },
  description: {
    type: Types.String,
    default: "",
  },
});

PollSchema.plugin(timestamps);

const Poll = mongoose.model("Poll", PollSchema);

export default Poll;
