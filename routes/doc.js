const express = require('express'),
    router = express.Router(),
    docCon = require('../app/controllers/docCon.js');

router.get('/', docCon.docHome);
router.get('/sub', docCon.docSub);
router.get('/file', docCon.load);
router.post('/file', docCon.docFile);

module.exports = router;