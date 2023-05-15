const mongoose = require('mongoose');
const docSchema = mongoose.Schema({
    DOC_name: {
        type: String,
        required: true
    },
    DOC_username: {
        type: String,
        required: true
    } ,
    DOC_password: {
        type: String,
        required: true
    },
    DOC_sub: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Doctors', docSchema);