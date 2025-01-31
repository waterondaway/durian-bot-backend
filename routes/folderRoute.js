const express = require('express')
const router = express.Router()
const { getAllFolders, getImageFolderID, getPropertiesFolderID } = require('../controllers/folderControl');

router.get('/folders', getAllFolders)
router.get('/folders/:id', getImageFolderID)
// router.get('/foldersProperties/:id', getPropertiesFolderID)
module.exports = router