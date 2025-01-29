const express = require('express')
const router = express.Router()
const { uploadSingleImage } = require('../controllers/uploadControl')
const multer = require('multer');
const path = require('path')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const farmer_id = req.body.farmer_id || "unknown";
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        const newFilename = `${farmer_id}_${timestamp}${fileExtension}`;
        cb(null, newFilename);
    },
  });

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    },
});

router.post("/upload", upload.single('image'), uploadSingleImage)

module.exports = router