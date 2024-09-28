const File = require("../models/File");
const { getBucket } = require("./downloadController");
const Folder = require("../models/Folder");

exports.deleteFile = async (req, res) => {
  const { filename } = req.params;

  let bucket = getBucket();
  if (!bucket) {
    return res.status(500).send("MongoDB not connected yet!");
  }

  try {
    // Check if the file exists
    const fileExists = await bucket.find({ filename: filename }).toArray();

    if (fileExists.length === 0) {
      return res.status(404).send("File not found.");
    }

    // Delete the file from GridFS
    await bucket.delete(fileExists[0]._id);

    // // Delete the document from the File collection
    await File.deleteOne({ storedName: filename });

    res.status(200).send("File deleted successfully.");
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).send("Error deleting file.");
  }
};
exports.trashFile = async (req, res) => {
  try {
    const { filename } = req.params;

    const file = await File.findOneAndUpdate(
      { storedName: filename },
      { isTrashed: true },
      { new: true }
    );

    if (!file) {
      console.log("File not found!");
      return res.status(404).json({ message: "File not found!" });
    }
    return res
      .status(200)
      .json({ message: "File trashed successfully!", file });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not trash file." });
  }
};

exports.restoreFile = async (req, res) => {
  try {
    const { filename } = req.params;

    const file = await File.findOneAndUpdate(
      {
        storedName: filename,
      },
      { isTrashed: false },
      { new: true }
    );

    if (file.folderId) {
      await Folder.findOneAndUpdate(
        {
          _id: file.folderId,
        },
        { isTrashed: false },
        { new: true }
      );
    }

    if (!file) {
      return res.status(404).json({ message: "File not found!" });
    }

    return res
      .status(200)
      .json({ message: "File restored successfully!", file });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not restore file." });
  }
};
