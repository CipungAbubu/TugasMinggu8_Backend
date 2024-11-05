const BorrowerModel = require("../models/borrower_model");
const { responseJson, responseError } = require("../utils/http");

const borrowerController = {};

borrowerController.insert = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return responseError(res, { message: "Name and email are required" }, 400);
        }

        const result = await BorrowerModel.create({ name, email });
        responseJson(res, { borrower: result }, "created", 201); 
    } catch (error) {
        responseError(res, error); 
    }
};

borrowerController.getAll = async (req, res, next) => {
    try {
        const results = await BorrowerModel.find({ isDeleted: false });
        responseJson(res, { borrowers: results }, "ok", 200); 
    } catch (error) {
        responseError(res, error); 
    }
};

borrowerController.update = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const { id } = req.params;

        if (!name && !email) {
            return responseError(res, { message: "At least one of name or email is required" }, 400);
        }

        const updatedData = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        const updatedBorrower = await BorrowerModel.findByIdAndUpdate(
            id,
            { ...updatedData, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedBorrower) {
            return responseError(res, { message: "Borrower not found" }, 404);
        }

        responseJson(res, { borrower: updatedBorrower }, "updated", 200); 
    } catch (error) {
        responseError(res, error); 
    }
};

borrowerController.delete = async (req, res, next) => {
    try {
        const { id } = req.params; 

        const deletedBorrower = await BorrowerModel.findByIdAndUpdate(
            id,
            { isDeleted: true, updatedAt: new Date() }, 
            { new: true }
        );

        if (!deletedBorrower) {
            return responseError(res, { message: "Borrower not found" }, 404); 
        }

        responseJson(res, { borrower: deletedBorrower }, "deleted", 200); 
    } catch (error) {
        responseError(res, error); 
    }
};

module.exports = borrowerController; 