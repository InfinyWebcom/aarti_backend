var express = require('express');
var categoryModel = require('../model/category')
var async = require('async');
const await = require('await');
const { validationResult } = require('express-validator')
const createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        const result = validationResult(req);


        if (result.errors.length > 0) {
            return res.status(200).json({
                error: true,
                title: result.errors[0].msg,
                errors: result,
            });
        }

        var categoryName = await categoryModel.findOne({ name: name })
        if (categoryName) {
            return res.status(200).json({
                title: "category alreday exists!",
                error: true
            })
        }

        var newCategory = { name, image }

        var data = await categoryModel.create(newCategory)
        res.status(200).json({
            title: "Categroy added successfully",
            error: false
        })

    } catch (error) {
        console.log(error)
    }
}

const categoryList = async (req, res) => {
    try {
        var category_List = await categoryModel.find({})

        return res.status(200).json({
            title: "Categories have been listed successfully.",
            error: false,
            category_List
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createCategory,
    categoryList
}
