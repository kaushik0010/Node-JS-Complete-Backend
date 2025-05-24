const express = require('express');
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware');
const uploadMiddleware = require('../middleware/upload.middleware');
const { uploadImageController, fetchImagesController } = require('../controllers/image-controller')


const router = express.Router();

// upload image
router.post(
    '/upload', 
    authMiddleware, 
    adminMiddleware, 
    uploadMiddleware.single('image'), 
    uploadImageController
);


// get all images
router.get("/getimage", 
    authMiddleware, 
    fetchImagesController
)

module.exports = router;