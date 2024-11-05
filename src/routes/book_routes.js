const express = require("express");
const bookController = require("../controllers/book_controller");

const bookRoutes = express.Router();

bookRoutes.post("/", bookController.insert);
bookRoutes.get("/", bookController.getAll);

// Rute untuk memperbarui buku berdasarkan ID
bookRoutes.put("/:id", bookController.update);

// Rute untuk menghapus buku berdasarkan ID
bookRoutes.delete("/:id", bookController.delete);

// Rute untuk mengupload sampul buku
bookRoutes.post("/:id/upload", bookController.uploadCover);

module.exports = bookRoutes;