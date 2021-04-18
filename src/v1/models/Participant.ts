import mongoose, { Schema } from "mongoose";

const timestamps = require("mongoose-timestamp");

const ParticipantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pollId: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
  },
});

ParticipantSchema.plugin(timestamps);

const Participant = mongoose.model("Participant", ParticipantSchema);

export default Participant;
