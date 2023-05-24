const Departments = require('../models/departments'),
    Subjects = require('../models/subjects'),
    Doctors = require('../models/doctors'),
    Students = require('../models/student'),
    File = require('../models/files.js'),
    fs = require('fs'),
    mult = require('../middleware/mult.js'),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' }),
    enc = require("bcrypt");





const docHome = async (req, res) => {

    const user = req.user;
    console.log(user)
    res.render('doc/docHome', { layout: false, user })

};


const docSub = async (req, res) => {

    const user = req.user;
    const subs = await Subjects.find({ SUB_doctor: user.username }).lean();
    console.log(subs);
    res.render('doc/docSub', { layout: false, subjects: subs });


};


const docFile = async (req, res) => {

    upload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Something went wrong' });
        }

        const { originalname, path, mimetype } = req.file;
        console.log(req.file);

        const fileData = fs.readFileSync(path);

        const newFile = new File({
            file_name: originalname,
            doctor_name: req.body.doctor_name,
            file_data: fileData,
            file_mimetype: mimetype,
            sub_name: req.body.sub_name,
        });
        await newFile.save();

        // Delete the temporary file
        fs.unlinkSync(path);

        res.send("File uploaded successfully");
    });
};

const load = (req, res) => {
    res.render('doc/file.ejs', { layout: false });
};

module.exports = {
    docHome,
    docSub,
    docFile,
    load,
}