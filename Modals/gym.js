const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic:{
        type: String,
        required: true,
    },
    gymName:{
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date
    }
},{
    timestamps: true
});

const modal = mongoose.model('gym', gymSchema);

module.exports = modal;