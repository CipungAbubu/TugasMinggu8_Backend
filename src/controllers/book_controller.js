const mongoose = require("mongoose");
const bookModel = require("../models/book_model");
const { responseJson, responseError } = require("../utils/http"); // Pastikan untuk mengimpor responseError

const bookController = {};

bookController.insert = async (req, res, next) => {
    try {
        const { title, totalStocks = 0, authorId, categories } = req.body;

        if (!title || !authorId || !categories || categories.length === 0) {
            throw new Error("Title, author, and categories are required.");
        }

        // Buat dokumen buku
        const doc = await bookModel.create({
            title,
            totalStocks,
            author: authorId,
            categories 
        });

        responseJson(res, { book: doc }, "created", 201);
    } catch (error) {
        next(error);
    }
};

bookController.getAll = async (req, res, next) => {
    try {
        const docs = await bookModel
            .find({ isDeleted: false })
            .populate("author", "_id name")
            .populate("categories", "_id name");

        responseJson(res, { books: docs }, "ok", 200);
    } catch (error) {
        next(error);
    }
};

bookController.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, totalStocks, authorId, categories } = req.body;

        // Validasi ID dan input
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseError(res, { message: "Invalid book ID." }, 400);
        }

        if (!title || !authorId || !categories || categories.length === 0) {
            return responseError(res, { message: "Title, author, and categories are required." }, 400);
        }

        const updatedBook = await bookModel.findByIdAndUpdate(
            id,
            { title, totalStocks, author: authorId, categories, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return responseError(res, { message: "Book not found." }, 404);
        }

        responseJson(res, { book: updatedBook }, "updated", 200);
    } catch (error) {
        console.log(error); // Log untuk debugging jika ada error
        next(error);
    }
};

bookController.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedBook = await bookModel.findByIdAndUpdate(
            id,
            { isDeleted: true, updatedAt: new Date() },
            { new: true }
        );

        if (!deletedBook) {
            throw new Error("Book not found.");
        }

        responseJson(res, { book: deletedBook }, "deleted", 200);
    } catch (error) {
        next(error);
    }
};

bookController.uploadCover = async (req, res, next) => {
    try {
        const { coverImageUrl, id } = req.body;

        if (!coverImageUrl || !id) {
            throw { name: "bad_request", message: "coverImageUrl and id are required" };
        }

        const result = await bookModel.findByIdAndUpdate(
            id,
            { coverImageUrl: coverImageUrl, updatedAt: new Date() }, 
            { new: true }
        );

        if (!result) {
            throw { name: "not_found", message: "Book not found." };
        }

        responseJson(res, { book: result }, "cover_uploaded", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = bookController;
