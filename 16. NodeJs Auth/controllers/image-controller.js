const Image = require('../models/image');
const {uploadToCloudinary} = require('../helpers/cloudinary.helpers');
const fs = require('fs');

const uploadImageController = async(req, res) => {
    try {
        
        // check if file is missing in req object
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required. Please upload an image'
            });
        };

        // upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path)

        // store image url and public id along with uploaded user id
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        // delete the file from local storage
        fs.unlinkSync(req.file.path)

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong, please try again'
        })
    }
}

const fetchImagesController = async(req, res) => {
    try {
        const images = await Image.find({});

        if(images) {
            res.status(200).json({
                success: true,
                data: images
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong, please try again'
        })
    }
}

module.exports = {
    uploadImageController,
    fetchImagesController
}