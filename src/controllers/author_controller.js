const AuthorModel = require("../models/author_model"); 
const { responseJson } = require("../utils/http");

const authorController = {};

authorController.insert = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw { name: "bad_request" }; 
        }

        const result = await AuthorModel.create({
            name,
        });
        responseJson(res, { author: result }, "created", 201); 
    } catch (error) {
        next(error); 
    }
};

authorController.getAll = async (req, res, next) => {
    try {
        const results = await AuthorModel.find({ isDeleted: false }); 
        responseJson(res, { authors: results }, "ok", 200); 
    } catch (error) {
        next(error); 
    }
};

authorController.getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const author = await AuthorModel.findById(id).where({ isDeleted: false });

        if (!author) {
            throw { name: "not_found" }; 
        }

        responseJson(res, { author }, "ok", 200);
    } catch (error) {
        next(error);
    }
};

authorController.update = async (req, res, next) => {
    try {
        const { name } = req.body; 
        const { id } = req.params; 

        if (!name) {
            throw { name: "bad_request" }; 
        }

        const updatedAuthor = await AuthorModel.findByIdAndUpdate(
            id,
            { name, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedAuthor) {
            throw { name: "not_found" }; 
        }

        responseJson(res, { author: updatedAuthor }, "updated", 200); 
    } catch (error) {
        next(error); 
    }
};

authorController.delete = async (req, res, next) => {
    try {
        const { id } = req.params; 

        const deletedAuthor = await AuthorModel.findByIdAndUpdate(
            id,
            { isDeleted: true, updatedAt: new Date() }, 
            { new: true }
        );

        if (!deletedAuthor) {
            throw { name: "not_found" }; 
        }

        responseJson(res, { author: deletedAuthor }, "deleted", 200); 
    } catch (error) {
        next(error); 
    }
};

authorController.uploadPhoto = async (req, res, next) => {
    try {
        const { imageUrl, id } = req.body;

        if (!imageUrl || !id) {
            throw { name: "bad_request", message: "imageUrl and id are required" };
        }

        const result = await AuthorModel.findByIdAndUpdate(
            id,
            { imageUrl: imageUrl, updatedAt: new Date() }, 
            { new: true }
        );

        if (!result) {
            throw { name: "not_found" };
        }

        responseJson(res, { author: result }, "photo_uploaded", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = authorController; 
