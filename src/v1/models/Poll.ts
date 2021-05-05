import mongoose, {Schema} from "mongoose";
import IUser from "../tools/interfaces/IUser";

const {Types} = Schema;

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

PollSchema.method('toTextValue', function () {
    let obj = this.toObject() as IPoll;
    return {text: obj.title, value: obj._id};
});
PollSchema.method('toJson', function () {
    return this.toJSON({});
    // let obj = this.toJSON({});
    // return {
    //     title: obj.title,
    //     id: obj._id,
    //     createDate: obj._created,
    // };
});

const Poll = mongoose.model("Poll", PollSchema);

export default Poll;
