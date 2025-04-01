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
    const Data = (await ProductModel.find()).filter(key=>key.price<=value);
    res.status(200).json(Data);
    } catch (error) {
        res.status(400).json(error); 
    }
}

module.exports = {
    showRelatedProduct,
    FilterProduct
}