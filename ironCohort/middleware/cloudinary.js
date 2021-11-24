const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Your three keys will be passed here from your .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "Blahblahblah", //this is the name of the folder in cloudinary, you can choose whatever you want
  allowFormats: ["jpg", "png"],
  // params: { resource_type: 'raw' }, => add this in case you want to upload other types of files, not just images
  filename: function (req, res, cb) {
    cb(null, res.originalname);
  },
});
module.exports = multer({ storage });