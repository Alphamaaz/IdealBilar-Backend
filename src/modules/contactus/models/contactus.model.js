// External modules
const mongoose = require('mongoose');

// constact schema

const contactusSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minLength: 20
    }
}, {
    timestamps: true
});


//exports
module.exports = mongoose.model('ContactUs', contactusSchema);