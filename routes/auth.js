const express = require('express'),
    router = express.Router(),
    userCon = require('../app/controllers/user.js');



router.get('/login', userCon.logForm);

router.post('/login', userCon.log);


module.exports = router;