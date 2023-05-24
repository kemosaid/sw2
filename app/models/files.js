const mongoose = require('mongoose');
const file = mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    file_data: {
        type: String,
        required: true
    },
    sub_name: {
        type: String,
        required: true
    },
    file_mimetype: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('file', file);