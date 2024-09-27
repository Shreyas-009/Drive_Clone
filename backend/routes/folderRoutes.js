const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/jwtVerify");
const {
  createFolder,
  getFolders,
  getFilesInFolder,
  deleteFolder,
  trashFolder,
  restoreFolder,
} = require("../controllers/folderController");

router.post("/create-folder", verifyToken, createFolder);
router.get("/get-folders", verifyToken, getFolders);
router.get("/:folderId/files", verifyToken, getFilesInFolder);
router.delete("/:folderId", deleteFolder);
router.put("/trash/:folderId", trashFolder);
router.put("/restore/:folderId", restoreFolder);

module.exports = router;
