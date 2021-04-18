import mongoose, { Schema } from "mongoose";
import EnumControl from "../tools/enums/EnumControl";
import TypeControl from "../tools/types/TypeControl";

const mongooseTimestamp = require("mongoose-timestamp");

const { Types } = Schema;

const QuestionSchema = new Schema({
  pollId: {
    type: Types.ObjectId,
    ref: "Poll",
  },
  text: {
    type: Types.String,
    required: true,
  },
  media: {
    type: Schema.Types.Array,
    default: [],
  },
  optionType: {
    type: Types.Number,
    default: EnumControl.Radio,
  },
});

QuestionSchema.plugin(mongooseTimestamp);

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
