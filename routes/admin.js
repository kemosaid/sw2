const express = require('express'),
    router = express.Router(),
    adminController = require('../app/controllers/admin.controller');

router.get('/', adminController.adminHome)
router.get('/showDept', adminController.showDept)
router.get('/createDept', adminController.createDept)
router.post('/createDept', adminController.storeDept)
router.get('/:id/edit', adminController.editDept)
router.post('/:id/edit', adminController.updateDept)
router.get('/:id/delete', adminController.deleteDept)
router.get('/showSub', adminController.showsub)
router.get('/addSub', adminController.addsub)
router.post('/addSub', adminController.storesub)
router.get('/:id/editSub', adminController.editSub)
router.post('/:id/editSub', adminController.updateSub)
router.get('/:id/deleteSub', adminController.deleteSub)
module.exports = router;