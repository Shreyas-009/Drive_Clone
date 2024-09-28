const Folder = require("../models/Folder");
const File = require("../models/File");

// Create a folder
exports.createFolder = async (req, res) => {
  const { folderName } = req.body;

  const userId = req.user.id;

  try {
    const folder = new Folder({ folderName, userId });
    await folder.save();
    res.status(201).json({ message: "Folder created successfully", folder });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ error: "Failed to create folder" });
  }
};

// Get all folders for the user
exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      userId: req.user.id,
      isTrashed: false,
    });
    if (!folders || folders.length === 0) {
      return res.status(200).json({ message: "No folders found" });
    }
    res.status(200).json(folders);
  } catch (error) {
    console.error("Error retrieving folders:", error);
    res.status(500).json({ message: "Failed to retrieve folders", error });
  }
};
exports.getTrashedFolder = async (req, res) => {
  try {
    const trashedFolders = await Folder.find({
      userId: req.user.id,
      isTrashed: true,
    });
    if (!trashedFolders || trashedFolders.length === 0) {
      return res.status(200).json({ message: "No trashed folders found" });
    }
    res.status(200).json(trashedFolders);
  } catch (error) {
    console.error("Error retrieving trashed folders:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve trashed folders", error });
  }
};

// Get files in a selected folder
exports.getFilesInFolder = async (req, res) => {
  const folderId = req.params.folderId;
  const userId = req.user.id;

  try {
    // Check if the folder exists and belongs to the user
    const folder = await Folder.findOne({ _id: folderId, userId });

    if (!folder) {
      return res.json({ message: "Folder not found or access denied" });
    }

    // Find files associated with the given folder ID and user ID
    const files = await File.find({ folderId, userId, isTrashed: false });
    if (!files || files.length === 0) {
      return res
        .status(200)
        .json({ message: "No files found in this folder", files: [] });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error retrieving files in folder:", error);
    res.status(500).json({ message: "Failed to retrieve files", error });
  }
};

// Delete folder and its files
exports.deleteFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    // Delete all files in the folder
    await File.deleteMany({ folderId: folderId });

    // Delete the folder
    await Folder.findByIdAndDelete(folderId);

    res.status(200).json({ message: "Folder and files deleted successfully!" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ message: "Failed to delete folder and files." });
  }
};
exports.trashFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    await Folder.findByIdAndUpdate(folderId, { isTrashed: true });

    await File.updateMany({ folderId }, { isTrashed: true });

    return res
      .status(200)
      .json({ message: "Folder and files trashed successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not trash folder." });
  }
};
exports.restoreFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }
    if (!folder.isTrashed) {
      return res.status(400).json({ message: "Folder is not trashed!" });
    }

    await Folder.findByIdAndUpdate(folderId, { isTrashed: false });

    await File.updateMany({ folderId }, { isTrashed: false });

    return res
      .status(200)
      .json({ message: "Folder and files restored successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Could not restore folder." });
  }
};
