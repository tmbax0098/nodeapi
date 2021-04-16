import mongoose, {Schema} from 'mongoose';
import IUser from "../tools/interfaces/IUser";
// import timestamps from "mongoose-timestamp";
const timestamps = require('mongoose-timestamp');

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
        max: 50
    },
    father: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: "",
        max: 50
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: "",
        max: 20
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
AccountSchema.plugin(timestamps);

AccountSchema.method('transform', function () {
    let obj = this.toObject();
    return {
        firstname: obj.firstname,
        lastname: obj.lastname,
        father: obj.father,
        phone: obj.phone,
    }
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;