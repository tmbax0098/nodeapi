//QuestionAnswerOption

import mongoose, { Schema } from "mongoose";

const mongooseTimestamp = require("mongoose-timestamp");

const QuestionCorrectOptionSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  questionOptionId: {
    type: Schema.Types.ObjectId,
    ref: "QuestionOption",
    required: true,
  },
});

QuestionCorrectOptionSchema.plugin(mongooseTimestamp);

const QuestionCorrectOption = mongoose.model(
  "QuestionCorrectOption",
  QuestionCorrectOptionSchema
);

export default QuestionCorrectOption;
