const express = require('express')
const router = express.Router()
const { getAllFolders, getImageFolderID } = require('../controllers/folderControl');

router.get('/folders', getAllFolders)
router.get('/folders/:id', getImageFolderID)
module.exports = router