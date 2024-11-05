const CategoryModel = require("../models/category_model");
const { responseJson } = require("../utils/http");

const categoryController = {};

categoryController.insert = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw { name: "bad_request" };
        }

        const result = await CategoryModel.create({
            name,
        });
        responseJson(res, { category: result }, "created", 201); 
    } catch (error) {
        next(error); 
    }
};

categoryController.getAll = async (req, res, next) => {
    try {
        const results = await CategoryModel.find({ isDeleted: false });
        responseJson(res, { categories: results }, "ok", 200); 
    } catch (error) {
        next(error); 
    }
};

categoryController.update = async (req, res, next) => {
    try {
        const { name } = req.body; 
        const { id } = req.params; 

        if (!name) {
            throw { name: "bad_request" };
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            { name, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedCategory) {
            throw { name: "not_found" };
        }

        responseJson(res, { category: updatedCategory }, "updated", 200); 
    } catch (error) {
        next(error); 
    }
};

categoryController.delete = async (req, res, next) => {
    try {
        const { id } = req.params; 

        const deletedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            { isDeleted: true, updatedAt: new Date() }, 
            { new: true }
        );

        if (!deletedCategory) {
            throw { name: "not_found" }; 
        }

        responseJson(res, { category: deletedCategory }, "deleted", 200); 
    } catch (error) {
        next(error); 
    }
};

module.exports = categoryController; 
