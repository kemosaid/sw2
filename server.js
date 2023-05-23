//define environment variables
require('dotenv').config();
//grab app dependencies
const express = require('express'),
    app = new express(),
    enc=require("bcrypt")
    expressLayout = require('express-ejs-layouts'),
    adminRoutes = require('./routes/admin.js'), 
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    host = 'localhost';

//define view engine
app.set('view engine', 'ejs');
app.use(expressLayout);
//static assets middleware
app.use(express.static(__dirname + '/assets'));
//database connection
(async function () {
    try {
        mongoose.connect(process.env.DB_URL)
        mongoose.set('strictQuery', true)
        const db = mongoose.connection
        if (db) {
            console.log('Connection Success');
        }
    } catch (err) {
        console.error(err, message);
    }
}
)();
//set express url.encoded middleware
app.use(express.urlencoded({ extended: true }));
//define app routes
app.use('/admin', adminRoutes);

//server running
app.listen(port, host, () => {
    console.log(`Server Running on ${host}:${port}`);
})