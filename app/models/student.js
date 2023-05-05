const mongoose = require('mongoose');
const stdSchema = mongoose.Schema({
    STD_name: {
        type: String,
        required: true
    },
    STD_username: {
        type: String,
        required: true
    } ,
    STD_password: {
        type: String,
        required: true
    },
    STD_academy: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Student', stdSchema);