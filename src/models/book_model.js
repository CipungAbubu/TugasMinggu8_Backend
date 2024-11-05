const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    totalStocks: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Author' 
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Category' 
    }], 
    coverImageUrl: { 
        type: String,
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

bookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
