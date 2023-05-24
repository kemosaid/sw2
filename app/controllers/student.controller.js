const expressEjsLayouts = require('express-ejs-layouts');
const Departments = require('../models/departments'),
   Subjects = require('../models/subjects'),
   Doctors = require('../models/doctors'),
   File = require('../models/files.js'),
   Students = require('../models/student');

Degree = require("../models/degrees");

function regsub(req, res) {
   Subjects.find({})
      .then((subject) => {
         Students.find({})
            .then((student) => { res.render("studentpages/registersub.ejs", { layout: "stdlayout.ejs", subject, student }) })
            .catch((err) => console.log(err.message))
      })
      .catch((err) => console.log(err))
}

function addd(req, res) {
   Subjects.find({})
      .then((subject) => {
         Students.find({})
            .then((student) => {
               Degree.find({}).then((degree) => { res.render("studentpages/registersub.ejs", { layout: "stdlayout.ejs", subject, student, degree }) })
            })
            .catch((err) => console.log(err.message))
      })
      .catch((err) => console.log(err))
}

function addsub(req, res) {
   //take data from form
   const user = req.user;

   const degree = Degree({
      stdname: user.username,
      subname: req.body.subname,
      subdeg: 0,

   });

   Subjects.findOne({ SUB_name: degree.subname })
      .then((returndata) => {

         console.log(degree.stdname)
         Degree.find({ $and: [{ subname: returndata.SUB_prev }, { stdname: degree.stdname }] })


            .then((founded) => {
               console.log(founded);
               if (founded.length == 0) {
                  Degree.find({ $and: [{ subname: degree.subname }, { stdname: degree.stdname }] }).then((data) => {
                     if (data.length == 0) {


                        degree.save()
                           .then(degree => {
                              res.redirect('/student/registersubject')
                           }).catch(err => {
                              console.log(err.message)
                              res.redirect('/student/registersubject')
                           })

                     } else { console.log("can't") }
                  })

               } else { res.redirect("/student/myview") }
            }).catch((err) => { console.error(err.message); })
      });

}

function mysub(req, res) {
   const user = req.user;
   Subjects.find({})
      .then((subject) => {
         Students.find({})
            .then((student) => {
               currentuser = user.username;
               Degree.find({ stdname: currentuser }).then((degree) => {

                  res.render("studentpages/mysubjects.ejs", { layout: "stdlayout.ejs", subject, student, degree })
               }).catch((err => console.log(err.message)))
            })
            .catch((err) => console.log(err.message))
      })
      .catch((err) => console.log(err))
}

const stuHome = async (req, res) => {

   const user = req.user;
   console.log(user);
   res.render('studentpages/stuHome.ejs', { layout: false, user });

};

const files = async (req, res) => {
   const user = req.user;
   Subjects.find({})
      .then((subject) => {
         Students.find({})
            .then((student) => {
               currentuser = user.username;
               Degree.find({ stdname: currentuser }).then(async (degree) => {

                  const file_list = await File.find({ $and: [{ sub_name: 'c++' }, { doctor_name: 'nader' }] }).lean();
                  console.log(file_list);
                  res.render("studentpages/stdFiles.ejs", { layout: false, files: file_list });

               }).catch((err => console.log(err.message)))
            })
            .catch((err) => console.log(err.message))
      })
      .catch((err) => console.log(err))


};

module.exports = {
   stuHome, regsub, addsub, mysub, addd, files
}