//QuestionOptionOption

import mongoose, { Schema } from "mongoose";

const mongooseTimestamp = require("mongoose-timestamp");

const QuestionOptionSchema = new Schema({
  value: {
    type: Schema.Types.String,
    required: true,
    default: "0",
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

QuestionOptionSchema.plugin(mongooseTimestamp);

const QuestionOption = mongoose.model("QuestionOption", QuestionOptionSchema);

export default QuestionOption;
