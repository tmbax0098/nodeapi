import mongoose from 'mongoose';

const timestamps = require('mongoose-timestamp');

const TokenSchema = new mongoose.Schema({
    value: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    device: {
        type: mongoose.Schema.Types.String,
        default: "unknown"
    },
    os: {
        type: mongoose.Schema.Types.String,
        default: "unknown"
    }
});
TokenSchema.plugin(timestamps);

const Token = mongoose.model("Token", TokenSchema);

export default Token;