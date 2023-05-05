const Departments = require('../models/departments'),
 Subjects = require('../models/subjects'),
 Students=require('../models/student');


//admin hame page
function adminHome(req, res) {
    res.render('adminPages/index.ejs')
}
//show departments
function showDept(req, res) {
    Departments.find({})
        .then((departments) => {
            res.render('adminPages/departmentpages/departments.ejs', { departments })
        })
        .catch((err) => console.log(err.message));
}
// create deaprtment
function createDept(req, res) {
    res.render('adminPages/departmentpages/createDept.ejs')
}
//store department in database
function storeDept(req, res) {
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
    const id = req.params.id;
    Departments.findById(id)
        .then((department) => {
            res.render('adminPages/departmentpages/edit.ejs', { department })
        })
        .catch((err) => console.log(err.message))
}

function updateDept(req, res) {
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
    Subjects.find({})
        .then((subjects) => {
            res.render('adminPages/subjectpages/subjects.ejs', { subjects })
        })
        .catch((err) => console.log(err.message));
}
function addsub(req, res) {
    Subjects.find({})

    .then((subjects) => {
        Departments.find({}).then((departments)=>{
        res.render('adminPages/subjectpages/addSubject.ejs', { subjects,departments })})
    })
    .catch((err) => console.log(err.message));
    
}
function storesub(req, res) {
    //take data from form
    const subject = Subjects({
        SUB_name: req.body.SUB_name,
        SUB_code: req.body.SUB_code,
        SUB_depart: req.body.SUB_depart,
        SUB_prev: req.body.SUB_prev,
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
    const id = req.params.id;
    Subjects.findById(id)
        .then((subjects) => {
            Departments.find({}).then((departments)=>{
                Subjects.find({})
                .then((a)=>{
                    res.render('adminPages/subjectpages/editSub.ejs', { subjects ,departments,a })

                })
                })
        })
        .catch((err) => console.log(err.message))
}

function updateSub(req, res) {
    const id = req.params.id;
    Subjects.findById(id)
        .then((subject) => {
           subject.SUB_name= req.body.SUB_name,
           subject.SUB_code= req.body.SUB_code,
           subject.SUB_depart= req.body.SUB_depart,
           subject.SUB_prev=req.body.SUB_prev,

            subject.save();
            res.redirect('/admin/showSub')
        })
        .catch(err => console.log(err.message))
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
function showStd(req,res){
    Students.find({})
    .then((student)=>{
        res.render("adminPages/studentpages/students.ejs",{student})
    })
    .catch((err)=>{console.log(err.message)})
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
            res.render('adminPages/studentpages/editStd.ejs', { student  })
           
        })
        .catch((err) => console.log(err.message))
}
function updateStd(req, res) {
    const id = req.params.id;
    Students.findById(id)
        .then((student) => {
            student.STD_name= req.body.STD_name,
            student.STD_username= req.body.STD_username,
            student.STD_password= req.body.STD_password,
            student.STD_academy= req.body.STD_academy,


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
    deleteStd
}