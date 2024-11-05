const express = require("express");
const categoryController = require("../controllers/category_controller");

const categoryRoutes = express.Router();

categoryRoutes.post("/", categoryController.insert);

categoryRoutes.get("/", categoryController.getAll);

categoryRoutes.delete("/:id", categoryController.delete);

categoryRoutes.put("/:id", categoryController.update);

module.exports = categoryRoutes;
