const Departments = require('../models/departments'),
    Subjects = require('../models/subjects'),
    Doctors = require('../models/doctors'),
    Students = require('../models/student'),
    enc = require("bcrypt");


//admin hame page
function adminHome(req, res) {
    console.log("1");

    const user = req.user;
    console.log(user)
    res.render('adminPages/index.ejs', { user })
}

//show departments
function showDept(req, res) {
    console.log("2");

    Departments.find({})
        .then((departments) => {
            res.render('adminPages/departmentpages/departments.ejs', { departments })
        })
        .catch((err) => console.log(err.message));
}

// create deaprtment
function createDept(req, res) {
    console.log("3");

    res.render('adminPages/departmentpages/createDept.ejs')
}

//store department in database
function storeDept(req, res) {
    console.log("4");

    //take data from form
    const department = Departments({
        DP_name: req.body.DP_name,
        DP_code: req.body.DP_code,
    });

    Departments.find({ $or: [{ DP_name: department.DP_name }, { DP_code: department.DP_code }] })
        .then((data) => {
            if (data.length == 0) {
                //save data in database
                department.save()
                    .then(department => {
                        console.log(department)
                        res.redirect('/admin/showDept')
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.redirect('/createDept')
                    })
            } else {
                console.log('Department exist');
                res.redirect('/admin/showDept')
            }
        })
        .catch(err => console.log(err.message));
}

//update department
function editDept(req, res) {
    console.log("5");

    const id = req.params.id;
    Departments.findById(id)
        .then((department) => {
            res.render('adminPages/departmentpages/edit.ejs', { department })
        })
        .catch((err) => console.log(err.message))
}

async function updateDept(req, res) {
    console.log("6");

    const id = req.params.id;
    Departments.findById(id)
        .then((department) => {
            department.DP_name = req.body.DP_name
            department.DP_code = req.body.DP_code

            department.save();
            res.redirect('/admin/showDept')
        })
        .catch(err => console.log(err.message))
}

//delete department
function deleteDept(req, res) {
    console.log("7");

    const id = req.params.id;
    Departments.findById(id)
        .then((department) => {
            department.deleteOne({ _id: id })
            res.redirect('/admin/showDept')
        })
        .catch(err => console.log(err.message))
}

/*------- subjects*/
function showsub(req, res) {
    console.log("8");

    Subjects.find({})
        .then((subjects) => {
            res.render('adminPages/subjectpages/subjects.ejs', { subjects })
        })
        .catch((err) => console.log(err.message));
}

function addsub(req, res) {
    console.log("9");

    Subjects.find({})

        .then((subjects) => {
            Departments.find({})
                .then((departments) => {
                    Doctors.find({})
                        .then((doctor) => { res.render('adminPages/subjectpages/addSubject.ejs', { subjects, departments, doctor }) })
                })
        })
        .catch((err) => console.log(err.message));

}

function storesub(req, res) {
    console.log("10");

    //take data from form
    const subject = Subjects({
        SUB_name: req.body.SUB_name,
        SUB_code: req.body.SUB_code,
        SUB_depart: req.body.SUB_depart,
        SUB_prev: req.body.SUB_prev,
        SUB_doctor: req.body.SUB_doctor,

    });

    Subjects.find({ $or: [{ SUB_name: subject.SUB_name }, { SUB_code: subject.SUB_code }] })
        .then((data) => {
            if (data.length == 0) {
                //save data in database
                subject.save()
                    .then(subjects => {
                        console.log(subjects)
                        res.redirect('/admin/showSub')
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.redirect('/admin/addSub')
                    })
            } else {
                console.log('Subject exist');
                res.redirect('/admin/showSub')
            }
        })
        .catch(err => console.log(err.message));
}

function editSub(req, res) {
    console.log("11");


    const id = req.params.id;
    console.log(id);

    Subjects.findById(id)
        .then((subjects) => {
            Departments.find({}).then((departments) => {
                Doctors.find({}).then((doctor) => {
                    Subjects.find({})
                        .then((a) => {
                            res.render('adminPages/subjectpages/editSub.ejs', { subjects, departments, a, doctor })
                        })

                })
            })
        })
        .catch((err) => console.log(err.message))
}

function updateSub(req, res) {
    console.log("12");

    const id = req.params.id;
    Subjects.findById(id)
        .then((subject) => {
            subject.SUB_name = req.body.SUB_name,
                subject.SUB_code = req.body.SUB_code,
                subject.SUB_depart = req.body.SUB_depart,
                subject.SUB_prev = req.body.SUB_prev,
                subject.SUB_doctor = req.body.SUB_doctor,

                subject.save();
            res.redirect('/admin/showSub')
        })
        .catch(err => console.log(err.message));
}

//delete Subject
function deleteSub(req, res) {
    const id = req.params.id;
    Subjects.findById(id)
        .then((subject) => {
            subject.deleteOne({ _id: id })
            res.redirect('/admin/showSub')
        })
        .catch(err => console.log(err.message))
}

/*------------------Students------------------ */
function showStd(req, res) {
    Students.find({})
        .then((student) => {
            res.render("adminPages/studentpages/students.ejs", { student })
        })
        .catch((err) => { console.log(err.message) })
}

function addStd(req, res) {
    res.render('adminPages/studentpages/addStudent.ejs')
}

function storeStd(req, res) {
    //take data from form
    const student = Students({
        STD_name: req.body.STD_name,
        STD_username: req.body.STD_username,
        STD_password: req.body.STD_password,
        STD_academy: req.body.STD_academy,

    });

    Students.find({ $or: [{ STD_name: student.STD_name }, { STD_academy: student.STD_academy }] })
        .then((data) => {
            if (data.length == 0) {
                //save data in database
                const salt = enc.genSaltSync(10)
                student.STD_password = enc.hashSync(req.body.STD_password, salt)
                student.save()
                    .then(students => {
                        console.log(students)
                        res.redirect('/admin/showStd')
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.redirect('/admin/addStd')
                    })
            } else {
                console.log('Subject exist');
                res.redirect('/admin/showStd')
            }
        })
        .catch(err => console.log(err.message));
}
function editStd(req, res) {
    const id = req.params.id;
    Students.findById(id)
        .then((student) => {
            res.render('adminPages/studentpages/editStd.ejs', { student })

        })
        .catch((err) => console.log(err.message))
}
function updateStd(req, res) {
    const id = req.params.id;
    Students.findById(id)
        .then((student) => {
            const salt = enc.genSaltSync(10)

            student.STD_name = req.body.STD_name,
                student.STD_username = req.body.STD_username,
                student.STD_password = enc.hashSync(req.body.STD_password, salt),
                student.STD_academy = req.body.STD_academy,


                student.save();
            res.redirect('/admin/showStd')
        })
        .catch(err => console.log(err.message))
}
function deleteStd(req, res) {
    const id = req.params.id;
    Students.findById(id)
        .then((student) => {
            student.deleteOne({ _id: id })
            res.redirect('/admin/showStd')
        })
        .catch(err => console.log(err.message))
}
function showDoc(req, res) {
    Doctors.find({})
        .then((doctor) => {
            res.render("adminPages/doctorpages/doctors.ejs", { doctor })
        })
        .catch((err) => { console.log(err.message) })
}
function addDoc(req, res) {
    res.render('adminPages/doctorpages/addDoctor.ejs')
}
function storeDoc(req, res) {
    //take data from form
    const doctor = Doctors({
        DOC_name: req.body.DOC_name,
        DOC_username: req.body.DOC_username,
        DOC_password: req.body.DOC_password,


    });
    //Doctors.find({ $or: [{ Doc_name: doctor.Doc_name }, { Doc_sub: doctor.Doc_sub }] })

    Doctors.find({ $or: [{ DOC_name: doctor.STD_name }, { DOC_username: doctor.DOC_username }] })
        .then((data) => {
            if (data.length == 0) {
                //save data in database
                const salt = enc.genSaltSync(10)
                doctor.DOC_password = enc.hashSync(req.body.DOC_password, salt)
                doctor.save()
                    .then(doctor => {
                        console.log(doctor)
                        res.redirect('/admin/showDoc')
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.redirect('/admin/addDoc')
                    })
            } else {
                console.log('Doctor found');
                res.redirect('/admin/showDoc')
            }
        })
        .catch(err => console.log(err.message));
}
function editDoc(req, res) {
    const id = req.params.id;
    Doctors.findById(id)
        .then((doctor) => {
            res.render('adminPages/doctorpages/editDoctor.ejs', { doctor })

        })
        .catch((err) => console.log(err.message))
}
function updateDoc(req, res) {
    const id = req.params.id;
    Doctors.findById(id)
        .then((doctor) => {
            const salt = enc.genSaltSync(10)

            doctor.DOC_name = req.body.DOC_name,
                doctor.DOC_sub = req.body.DOC_sub,
                doctor.DOC_username = req.body.DOC_username,
                doctor.DOC_password = enc.hashSync(req.body.DOC_password, salt),


                doctor.save();
            res.redirect('/admin/showDoc')
        })
        .catch(err => console.log(err.message))
}
function deleteDoc(req, res) {
    const id = req.params.id;
    Doctors.findById(id)
        .then((doctor) => {
            doctor.deleteOne({ _id: id })
            res.redirect('/admin/showDoc')
        })
        .catch(err => console.log(err.message))
}

module.exports = {
    adminHome,
    showDept,
    storeDept,
    createDept,
    editDept,
    updateDept,
    deleteDept,
    showsub,
    addsub,
    storesub,
    editSub,
    updateSub,
    deleteSub,
    showStd,
    addStd,
    storeStd,
    editStd,
    updateStd,
    deleteStd,
    showDoc,
    addDoc,
    storeDoc,
    editDoc,
    updateDoc,
    deleteDoc,
}