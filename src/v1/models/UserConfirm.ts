import mongoose from 'mongoose';

const UserConfirmSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
    },
    code: {
        type: mongoose.Schema.Types.String,
    },
});

const UserConfirm = mongoose.model("UserConfirm", UserConfirmSchema);

export default UserConfirm;