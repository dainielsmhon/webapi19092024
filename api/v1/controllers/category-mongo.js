const CategoryModel = require('../models/category');
module.exports = {
    getAllCategory: (req, res) => {
        CategoryModel.find().then((cat) => {
            console.log(cat);
            return res.status(200).json(cat);
        });
    },

    getCategoryById: (req, res) => {
        CategoryModel.find({ cid: req.params.id }).then((cat) => {
            return res.status(200).json(cat);
        });
    },


    addNewCategory: (req, res) => {
        CategoryModel.insertMany([req, body]).then((cat) => {

            return res.status(200).json(cat);
        });
    },

    updateCategoryById: (req, res) => {

        CategoryModel.updateMany({ cid: req.params.id }, req.body).then((cat) => {

            return res.status(200).json(cat);
        });
    },
    deleteCategory: (req, res) => {
        CategoryModel.deleteOne({ cid: req.params.id }, req.body).then((cat) => {

            return res.status(200).json(cat);
        });
    }



};