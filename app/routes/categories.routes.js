const category = require('../controllers/categories.controller.js');
var router = require('express').Router();

// get all category list
router.get('/get-list',category.getList);
// create category
router.post('/create',category.create);
// update category
router.put('/update',category.update);
// delete category
router.delete('/delete',category.delete);

module.exports = router;