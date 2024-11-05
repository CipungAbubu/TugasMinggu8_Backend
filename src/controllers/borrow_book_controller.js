const { responseJson, responseError } = require("../utils/http");
const BorrowedBookModel = require("../models/borrowed_book_model");

// Endpoint untuk meminjam buku
exports.borrow = async (req, res, next) => {
    try {
        const { bookId, borrowerId, expectedReturnAt } = req.body;

        const borrowedBook = new BorrowedBookModel({
            book: bookId,
            borrower: borrowerId,
            expectedReturnAt: expectedReturnAt,
        });

        await borrowedBook.save();

        responseJson(res, { borrowedBook }, "Book borrowed successfully", 201);
    } catch (error) {
        console.error("Error borrowing book:", error);
        responseError(res, error.message || "Failed to borrow book", 500);
        next(error);
    }
};

// Endpoint untuk mendapatkan daftar peminjam buku yang masih aktif
exports.getActiveBorrowedBooks = async (req, res, next) => {
    try {
        const borrowedBooks = await BorrowedBookModel.find({ returnedAt: null }).populate('book borrower');
        responseJson(res, { borrowedBooks }, "Active borrowed books retrieved", 200);
    } catch (error) {
        console.error("Error retrieving borrowed books:", error);
        responseError(res, error.message || "Failed to retrieve borrowed books", 500);
        next(error);
    }
};

// Endpoint untuk mengembalikan buku
exports.returnBook = async (req, res, next) => {
    try {
        const { borrowedBookId } = req.body;

        const updatedBorrowedBook = await BorrowedBookModel.findByIdAndUpdate(
            borrowedBookId,
            { returnedAt: Date.now() },
            { new: true }
        );

        responseJson(res, { updatedBorrowedBook }, "Book returned successfully", 200);
    } catch (error) {
        console.error("Error returning book:", error);
        responseError(res, error.message || "Failed to return book", 500);
        next(error);
    }
};
