const express = require('express');
const router = express.Router();
const borrowController = require("../controllers/borrow_book_controller"); 

// Middleware untuk mengurai body JSON
router.use(express.json());

// Route untuk meminjam buku
router.post('/book', borrowController.borrow); 

// Route untuk mendapatkan list peminjam buku yang aktif
router.get('/book/list', borrowController.getActiveBorrowedBooks); 

// Route untuk mengembalikan buku
router.post('/book/return', borrowController.returnBook); 

module.exports = router;
