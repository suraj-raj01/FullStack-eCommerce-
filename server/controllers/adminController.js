const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const ProductModel = require("../models/productModel")

const registration = async (req, res) => {
    const { name, useremail, mobileno, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8)
    try {
        await userModel.create({
            username: name,
            useremail: useremail,
            mobileno: mobileno,
            password: hashedPassword
        })
        res.status(200).json("Registration successfully completed!!")
    } catch (error) {
        res.status(400).json({ mst: "Something went wrong!" })
    }
}

const login = async (req, res) => {
    const { useremail, password } = req.body;
    try {
        const User = await userModel.findOne({ useremail: useremail });
        const isMatch = await bcrypt.compare(password, User.password);
        if (!User) {
            res.status(400).json("Invalid user");
        }
        else if (!isMatch) {
            res.status(400).json("Invalid password");
        }
        else {
            res.status(200).json(User);
        }
    } catch (error) {
        res.status(400).json({ msg: "something went wrong!!!" });
    }
}

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
    console.log(req.body);
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
        console.log(Data);
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

const updateRatingStar = async(req,res) =>{
    console.log(req.body);
    console.log("HELLO")
    res.send("OKKK")
}

module.exports = {
    registration,
    login,
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
    updateRatingStar
}