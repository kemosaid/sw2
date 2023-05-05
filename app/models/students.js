const mongoose = require('mongoose');
const stdSchema = mongoose.Schema({
    ST_username: {
        type: String,
        required: true
    },
    ST_password: {
        type: String,
        required: true
    },
    ST_acdademy: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Student',stdSchema);