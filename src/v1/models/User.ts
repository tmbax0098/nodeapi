import mongoose from 'mongoose';
import validator from 'validator';
import IUser from "../tools/interfaces/IUser";
import EnumRoles from "../tools/enums/EnumRoles";
import IAnswerUser from "../tools/interfaces/IAnswerUser";

const timestamps = require('mongoose-timestamp');


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
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    role: {
        type: mongoose.Schema.Types.String,
        default: EnumRoles.member,
    },
    accesses: [{
        type: mongoose.Schema.Types.Number,
    }],
    services: [{
        type: mongoose.Schema.Types.Number,
    }]
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
UserSchema.method('forToken', function () {
    let obj = this.toObject() as IUser;

    let result: IAnswerUser = {
        username: obj.username,
        role: obj.role,
        services: obj.services,
        id: obj._id,
        accesses: obj.accesses
    }

    return result;
});

const User = mongoose.model("User", UserSchema);

export default User;