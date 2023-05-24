const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    ADMIN_name: {
        type: String,
        required: true
    },
    ADMIN_username: {
        type: String,
        required: true
    } ,
    ADMIN_password: {
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('Admin', adminSchema);