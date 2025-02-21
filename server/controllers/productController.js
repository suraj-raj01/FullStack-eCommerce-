const ProductModel = require("../models/productModel")


const showRelatedProduct = async(req,res) =>{
    const{name} = req.body;
    console.log(name)
    try {
        const Data = await ProductModel.find({category:name})
        res.status(200).send(Data);
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    showRelatedProduct
}