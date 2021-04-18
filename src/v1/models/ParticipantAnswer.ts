import mongoose, { Schema } from "mongoose";

const timestamps = require("mongoose-timestamp");

const ParticipantAnswerSchema = new Schema({
  participantId: {
    type: Schema.Types.ObjectId,
    ref: "Participant",
  },
  questionOptionId: {
    type: Schema.Types.ObjectId,
    ref: "QuestionOption",
  },
});

ParticipantAnswerSchema.plugin(timestamps);

const ParticipantAnswer = mongoose.model(
  "ParticipantAnswer",
  ParticipantAnswerSchema
);

export default ParticipantAnswer;
