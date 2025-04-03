const ProductModel = require("../models/productModel")


const showRelatedProduct = async(req,res) =>{
    const{name} = req.body;
    try {
        const Data = await ProductModel.find({category:name}).sort({"price":1})
        res.status(200).send(Data);
    } catch (error) {
        res.status(400).send(error)
    }
}

const FilterProduct=async(req,res)=>{
    const{value} = req.body;
    try {
    if(value==1000){
    let Data = (await ProductModel.find().sort({price:1})).filter(key=>key.price<=value)
    res.status(200).json(Data);
    }
    else if(value==5000){
    let Data = (await ProductModel.find().sort({price:1})).filter(key=>key.price<=value && key.price>1000)
    res.status(200).json(Data);
    }
    else if(value==10000){
    let Data = (await ProductModel.find().sort({price:1})).filter(key=>key.price<=value && key.price>5000)
    res.status(200).json(Data);
    }
    else if(value==500000){
    let Data = (await ProductModel.find().sort({price:1})).filter(key=>key.price<=value && key.price>10000)
    res.status(200).json(Data);
    }
    } catch (error) {
        res.status(400).json(error); 
    }
}

const FilterProductByName=async(req,res)=>{
    const{value} = req.body;
    try {
        const Data = await ProductModel.find({"name": { $regex: value,$options:'i'}});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).json(error);
    }
}

const FilterProductByCategory=async(req,res)=>{
    const{value} = req.body;
    try {
        const Data = await ProductModel.find({"category": { $regex: value,$options:'i'}});
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    showRelatedProduct,
    FilterProduct,
    FilterProductByName,
    FilterProductByCategory
}