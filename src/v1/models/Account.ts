import mongoose, {Schema} from 'mongoose';
// import timestamps from "mongoose-timestamp";
const timestamps = require('mongoose-timestamp');

const AccountSchema = new mongoose.Schema({
    firstname : {
        type : mongoose.Schema.Types.String,
        required : false,
        default : "",
        max : 50,
    },
    lastname : {
        type : mongoose.Schema.Types.String,
        required : false,
        default : "",
        max : 50
    },
    father  :{
        type : mongoose.Schema.Types.String,
        required : false,
        default : "",
        max : 50
    },
    phone : {
        type : mongoose.Schema.Types.String,
        required : false,
        default : "",
        max : 20
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});
AccountSchema.plugin(timestamps);

const Account =  mongoose.model("Account" , AccountSchema);

export default Account;