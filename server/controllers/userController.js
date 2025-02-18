const UserModel = require("../models/userModel")

const Registration = async (req, res) => {
    const { name, shippingaddress, apartment, mobileno, pincode, district, state, useremail, password } = req.body;
    try {
        const Data = await UserModel.create({
            name,
            shippingaddress,
            apartment,
            mobileno,
            pincode,
            district,
            state,
            useremail,
            password
        })
        res.status(200).josn("Registration Successfully completed!!!")
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    Registration,
}