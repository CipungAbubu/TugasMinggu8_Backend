const express = require("express");
const borrowerController = require("../controllers/borrower_controller"); 

const router = express.Router();

router.post("/", borrowerController.insert); 

router.get("/", borrowerController.getAll); 

router.put("/:id", borrowerController.update); 

router.delete("/:id", borrowerController.delete); 

module.exports = router;