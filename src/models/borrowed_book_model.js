const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    book: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Book" // Pastikan referensi ini sesuai dengan nama model buku
    },
    borrower: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Borrower" // Pastikan referensi ini sesuai dengan nama model peminjam
    },
    expectedReturnAt: {
        type: Date,
        required: true // Pastikan field ini dibutuhkan
    },
    borrowedAt: {
        type: Date,
        default: Date.now
    },
    returnedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

// Middleware untuk memperbarui updatedAt sebelum menyimpan
borrowedBookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Mengatur transformasi untuk JSON
borrowedBookSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id; // Menambahkan id ke hasil JSON
        delete ret._id; // Menghapus _id asli
        delete ret.__v; // Menghapus versi
        return ret;
    }
});

const BorrowedBookModel = mongoose.model("BorrowedBook", borrowedBookSchema);

module.exports = BorrowedBookModel;
