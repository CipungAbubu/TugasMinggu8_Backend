const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        requaired: false,
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

authorSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id; 
        delete ret._id; 
        delete ret.__v;
        return ret;
    }
});

const AuthorModel = mongoose.model("Author", authorSchema);

module.exports = AuthorModel;
