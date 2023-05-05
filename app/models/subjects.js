const mongoose = require('mongoose');
 subSchema = mongoose.Schema({
    SUB_name: {
        type: String,
        required: true
    },
    SUB_code: {
        type: String,
        required: true
    },
    SUB_depart:{
        type: Object,
        required: true
    } ,

    SUB_prev:{
        type: String
       
    }

});

module.exports = mongoose.model('Subject',subSchema);