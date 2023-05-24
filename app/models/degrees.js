const mongoose = require('mongoose');
const degreeSchema = mongoose.Schema({
    stdname: {
        type: String,
        required: true
    },
    subname: {
        type: String,
        required: true
    },
    subdeg: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Degree', degreeSchema);