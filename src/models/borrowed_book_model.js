const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    book: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Book" 
    },
    borrower: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Borrower" 
    },
    expectedReturnAt: {
        type: Date,
        required: true 
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

borrowedBookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

borrowedBookSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id; 
        delete ret._id; 
        delete ret.__v; 
        return ret;
    }
});

const BorrowedBookModel = mongoose.model("BorrowedBook", borrowedBookSchema);

module.exports = BorrowedBookModel;
