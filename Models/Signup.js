const mongoose = require("mongoose");


const SignupSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        },
    dateofbirth: {
        type: Date,
        required: true,
        },
    Rollno: {
        type: String,
        sparse: true,
        unique: true,
        },
    collegename: {
        type: String,
        required: true,
        },
});


    const SignupModel = mongoose.model("Signup", SignupSchema);
    module.exports = SignupModel;
