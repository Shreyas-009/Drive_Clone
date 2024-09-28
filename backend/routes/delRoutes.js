const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/jwtVerify");
const { deleteFile, trashFile, restoreFile } = require("../controllers/delController");

router.delete("/delete/:filename", deleteFile);
router.put("/trash/:filename", trashFile);
router.put("/restorefile/:filename", restoreFile);
// router.put("/restore/:filename", trashFile);

module.exports = router;
