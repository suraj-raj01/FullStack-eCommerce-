const express = require("express");
const route = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require("../controllers/adminController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Save file with a unique name
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB
});

route.post("/productsave",upload.array('files', 10), adminController.productSave);
route.post("/registration", adminController.registration);
route.post("/login", adminController.login);
route.get("/displaydata", adminController.displayData);
route.post("/editproductdata", adminController.editProductData);
route.post("/editproductsave", adminController.editProductSave);
route.post("/deleteproductdata", adminController.deleteProductData);
route.post("/makeproductprimary", adminController.makeProductPrimary);
route.post("/makeproductnormal", adminController.makeProductNormal);
route.get("/displayprimarydata", adminController.displayPrimaryData);
route.post("/itemdetails", adminController.itemDetails);


module.exports = route;