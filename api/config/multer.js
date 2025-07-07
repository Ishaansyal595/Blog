import multer from "multer";

// Set disk storage location and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

// Filter to allow only image files
function fileFilter(req, file, cb) {
  const allowedFiles = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new Error("Only images are allowed."), false);
  }

  cb(null, true);
}

// Initialize multer with config
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
