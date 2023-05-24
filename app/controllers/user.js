
const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    student = require('../models/student.js'),
    doctor = require('../models/doctors.js'),
    admin = require('../models/admins.js'),
    department = require('../models/departments.js'),
    subject = require('../models/subjects.js'),
    notifier = require('node-notifier');


const log = async (req, res) => {

    const { username, password, role } = req.body;
    let user, pass;
    
    if (role == 'doctor') {
        try {
            user = await doctor.findOne({ DOC_username: username });
            pass = user.DOC_password;
        }
        catch (err) {
            res.send("err");
        }
    }
    if (role == 'student') {
        try {
            user = await student.findOne({ STD_username: username });
            pass = user.STD_password;
        }
        catch (err) {
            res.send("err");
        }

    }
    if (role == 'admin') {
        try {
            user = await admin.findOne({ ADMIN_username: username });
            pass = user.ADMIN_password;
        }
        catch (err) {
            res.send("err");
        }
    }

    const isCorrectPassword = bcrypt.compareSync(password, pass);
    const isCorrectPasswordAdmin = password == pass;

    if (!isCorrectPassword && !isCorrectPasswordAdmin) res.send("incorrect password");

    const data = {
        _id: user._id,
        username,
        role,
    };

    console.log(data);

    const jwtToken = jwt.sign(data, process.env.JWT_SECRET);
    res.cookie('token', jwtToken);
    if (isCorrectPassword && role === 'doctor') {
        res.redirect('/doc');
    }
    if (isCorrectPasswordAdmin && role === 'admin') {
        res.redirect('/admin');
    }
    if (isCorrectPassword && role === 'student') {
        res.redirect('/student');
    }
}

const logForm = (req, res) => {
    res.render('login/login.ejs', { layout: false });
};

module.exports = {
    log,
    logForm,
}