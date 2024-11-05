const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
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

categorySchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id; 
        delete ret._id; 
        delete ret.__v; 
        return ret;
    }
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
