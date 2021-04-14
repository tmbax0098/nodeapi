import mongoose, {Schema} from 'mongoose';
import {cryptoOption} from "../../config";
import IUser from "../interfaces/IUser";
// import timestamps from "mongoose-timestamp";
const timestamps = require('mongoose-timestamp');
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        min: 6,
        max: 50,
        validate: {
            validator: function (value: string): boolean {
                return validator.isEmail(value);
            },
            message: props => `username must be email.`
        },
        required: [true, 'username is required']
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        min: 6,
        max: 200
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: "Member",
        min: 3,
        max: 50
    },
    active: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
        default: false,
    },
    block: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
        default: false,
    },
    confirmed: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
        default: false,
    },
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
    }
});
UserSchema.plugin(timestamps);


UserSchema.method('transform', function () {
    let obj = this.toObject() as IUser;

    //Rename fields
    obj["id"] = obj._id;
    delete obj._id;
    delete obj.password;

    return obj;
});
// UserSchema.pre('save', function (user: any, next: any) {
//
//
//     // user.password  = hash(user.password,);
//     next();
// });

const User = mongoose.model("User", UserSchema);

export default User;