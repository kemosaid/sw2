const express = require('express'),
    router = express.Router(),
    studentController = require('../app/controllers/student.controller');

    // router.get("/registersubject",studentController.regsub);
    router.get("/registersubject",studentController.addd);
    router.post("/registersubject",studentController.addsub);
    router.get("/myview",studentController.mysub);
    
    router.get("/",studentController.stuHome);
    
    router.get("/files",studentController.files);

module.exports = router;