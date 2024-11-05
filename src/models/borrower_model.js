// src/models/borrower_model.js

const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
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
    }
});

borrowerSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id; 
        delete ret._id; 
        delete ret.__v; 
        return ret;
    }
});

const BorrowerModel = mongoose.model("Borrower", borrowerSchema);

module.exports = BorrowerModel;