const express = require("express");
const authorController = require("../controllers/author_controller");

const router = express.Router();

router.get("/", authorController.getAll);

router.get("/:id", authorController.getById);

router.post("/", authorController.insert);

router.put("/:id", authorController.update);

router.delete("/:id", authorController.delete);

router.post("/upload", authorController.uploadPhoto);

module.exports = router; 
