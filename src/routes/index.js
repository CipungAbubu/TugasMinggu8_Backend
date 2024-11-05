const express = require('express');
const testRoutes = require('./test_routes');
const authorRoutes = require('./author_routes'); 
const categoryRoutes = require('./category_routes');
const borrowerRoutes = require('./borrower_routes');
const bookRoutes = require('./book_routes');
const borrowBookRoutes = require('./borrow_book_routes');

const routes = express.Router();

// Kumpulkan semua routes disini per bagian ex : /author, /books dll
routes.use("/test", testRoutes);
routes.use("/authors", authorRoutes); 
routes.use("/categories", categoryRoutes);
routes.use("/borrowers", borrowerRoutes);
routes.use("/book", bookRoutes);
routes.use("/borrow", borrowBookRoutes);

module.exports = routes; 

