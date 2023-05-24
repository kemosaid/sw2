//define environment variables
require('dotenv').config();
//grab app dependencies
const express = require('express'),
    app = new express(),
    enc = require("bcrypt")

expressLayout = require('express-ejs-layouts'),
    adminRoutes = require('./routes/admin.js'),
    docRoutes = require('./routes/doc.js'),
    cookieParser = require('cookie-parser'),
    studentroute = require('./routes/std.js'),
    authRouter = require('./routes/auth.js'),
    auth = require('./app/middleware/authentication.js'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    host = 'localhost';

//define view engine
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(cookieParser());


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
app.use('/', authRouter);
app.use('/admin', auth.authentication, adminRoutes);
app.use('/doc', auth.authentication2, docRoutes);
app.use('/student', auth.authentication3, studentroute);


//server running
app.listen(port, host, () => {
    console.log(`Server Running on ${host}:${port}`);
})