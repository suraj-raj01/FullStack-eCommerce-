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

module.exports = {
    showRelatedProduct
}