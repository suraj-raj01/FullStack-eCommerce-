const customerModel = require("../models/customerModel");
const ProductModel = require("../models/productModel")


const productSave = async (req, res) => {
    const imgUrls = req.files.map(file => file.path);
    const { name, brand, price, description, category, subcategory } = req.body;
    await ProductModel.create({
        name: name,
        brand: brand,
        price: price,
        description: description,
        category: category,
        subcategory: subcategory,
        images: [imgUrls],
        defaultImage: imgUrls[0]
    })
    res.status(200).json("Product successfully Uploaded!!")
}

const displayData = async (req, res) => {
    try {
        const Data = await ProductModel.find();
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).json(error);
    }
}

const editProductData = async (req, res) => {
    const { id} = req.body;
    try {
        const Data = await ProductModel.findById(id);
        res.status(201).json(Data)
    } catch (error) {
        res.status(400).json(error);
    }
}

const editProductSave = async(req,res) =>{
    // const imgUrls = req.files.map(file => file.path);
    const {id, name, brand, price, description, category, subcategory } = req.body;
    try {
       const Data = await ProductModel.findByIdAndUpdate(id,{
            name: name,
            brand: brand,
            price: price,
            description: description,
            category: category,
            subcategory: subcategory,
            images: [imgUrls],
            defaultImage: imgUrls[0]
        })
        res.status(200).json("Product successfully Uploaded!!")
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteProductData = async (req, res) => {
    const { id } = req.body;
    try {
        await ProductModel.findByIdAndDelete(id);
        res.status(201).json({ msg: "Product Deleted Successfully!!!" })
    } catch (error) {
        res.status(400).json(error);
    }
}

const makeProductPrimary = async (req, res) => {
    const { id } = req.body;
    try {
        await ProductModel.findByIdAndUpdate(id, { status: "primary" });
        res.status(201).json({ msg: "Your product is now primary!!" })
    } catch (error) {
        res.status(400).json(error);
    }
}

const makeProductNormal = async (req, res) => {
    const { id } = req.body;
    try {
        await ProductModel.findByIdAndUpdate(id, { status: "normal" });
        res.status(201).json({ msg: "Your product is now primary!!" })
    } catch (error) {
        res.status(400).json(error);
    }
}

const displayPrimaryData = async(req,res)=>{
    try {
        const Data = await ProductModel.find({status:"primary"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).json(error);
    }
}

const itemDetails = async(req,res)=>{
    const{id} = req.body;
    try {
        const Data = await ProductModel.findById(id);
        res.status(200).json(Data)
    } catch (error) {
        res.status(400).json(error);
    }
}

const displayLaptops = async(req,res) =>{
    try {
        const Data = await ProductModel.find({category:"Laptops"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).josn({msg:"Something went wrong!!"})
    }
}

const displayMobiles = async(req,res) =>{
    try {
        const Data = await ProductModel.find({category:"Mobiles"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).josn({msg:"Something went wrong!!"})
    }
}

const displayTv = async(req,res) =>{
    try {
        const Data = await ProductModel.find({category:"TV"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).josn({msg:"Something went wrong!!"})
    }
}

const displayMouse = async(req,res) =>{
    try {
        const Data = await ProductModel.find({category:"Mouse"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).josn({msg:"Something went wrong!!"})
    }
}

const displayKeyboards = async(req,res) =>{
    try {
        const Data = await ProductModel.find({category:"Keyboard"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).josn({msg:"Something went wrong!!"})
    }
}

const displaySmartWatches = async(req,res) =>{
    try {
        const Data = await ProductModel.find({category:"SmartWatch"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).josn({msg:"Something went wrong!!"})
    }
}

const displayWatches = async(req,res) =>{
    try {
        const Data = await ProductModel.find({category:"Watch"});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).josn({msg:"Something went wrong!!"})
    }
}

const updateRating = async(req,res) =>{
    const{id,value} = req.body;
    try {
       await ProductModel.findByIdAndUpdate(id,{ratings:value});
       res.status(200).json("SUCCESS")
    } catch (error) {
        res.status(400).json(error)
    }
}

const searchCustomer = async(req,res)=>{
    const{email} = req.body;
    try {
        const Data = await customerModel.find({"useremail": { $regex: email,$options:'i'}});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    productSave,
    displayData,
    editProductData,
    editProductSave,
    deleteProductData,
    makeProductPrimary,
    makeProductNormal,
    displayPrimaryData,
    itemDetails,
    displayLaptops,
    displayMobiles,
    displayTv,
    displayMouse,
    displayKeyboards,
    displaySmartWatches,
    displayWatches,
    updateRating,
    searchCustomer
}