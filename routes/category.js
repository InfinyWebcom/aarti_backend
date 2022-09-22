
var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
var category = require('../controllers/category')

router.post('/createCategory', (req, res) => {
    category.createCategory(req, res)
})

router.get('/categoryList',
    (req, res) => {
        category.categoryList(req, res)
    })

module.exports = router;