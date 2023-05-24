
const express = require('express'),
    jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    console.log(req.cookies);
    const { token } = req.cookies;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        console.log(decode);
        if (decode.role == 'admin')
            next();
        else return res.redirect('/login');
    } catch (err) {
        return res.redirect('/login');
    }
}

const authentication2 = (req, res, next) => {
    console.log(req.cookies);
    const { token } = req.cookies;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        if (decode.role == 'doctor')
            next();
        else return res.redirect('/login');
    } catch (err) {
        return res.redirect('/login');
    }
}

const authentication3 = (req, res, next) => {
    console.log(req.cookies);
    const { token } = req.cookies;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        console.log(decode);
        if (decode.role == 'student')
            next();
        else return res.redirect('/login');
    } catch (err) {
        return res.redirect('/login');
    }
}

module.exports = {
    authentication,
    authentication2,
    authentication3,
}