const UserModel = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/customerModel");
const userModel = require("../models/userModel");

const registration = async (req, res) => {
    const { name, shippingaddress, apartment, mobileno, pincode, district, state, useremail, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    try {
        const Data = await UserModel.create({
            name: name,
            shippingaddress: shippingaddress,
            apartment: apartment,
            mobileno: mobileno,
            pincode: pincode,
            district: district,
            state: state,
            useremail: useremail,
            password: hashedPassword
        })
        res.status(200).json(Data)
    } catch (error) {
        res.status(400).json(error)
    }
}

const userLogin = async (req, res) => {
    const { useremail, password } = req.body;
    console.log(useremail, password);

    try {
        // Step 1: Check if user exists
        const User = await UserModel.findOne({ useremail: useremail });
        if (!User) {
            return res.status(400).json({ msg: "Invalid Username" });
        }

        console.log(User);

        // Step 2: Compare passwords
        const comparePass = await bcrypt.compare(password, User.password);
        if (!comparePass) {
            return res.status(400).json({ msg: "Invalid Password!!" });
        }

        // Step 3: Generate JWT token
        const token = jwt.sign(
            { id: User._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Step 4: Send token
        return res.status(200).json({ token: token });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Something went wrong!!!" });
    }
};


const userProfile = async(req, res)=>{
    const token = req.header("Authorization");
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const User= await UserModel.findById(decoded.id);
        res.status(200).send(User);
    } catch (error) {
        res.status(400).send({msg:"Something went wrong!!"})
    }
}

const userProfileShow=async(req,res)=>{
    const{id} = req.body;
    try {
        const Data = await UserModel.findById(id);
        res.status(200).send(Data);
    } catch (error) {
        res.status(400).send({msg:"Something went wrong!!"})
    }
}

const customerRecords=async(req,res)=>{
    try {
        const Data = await CustomerModel.find();
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).json({msg:"Something went wrong!!!"})
    }
}

const purchasedItems = async(req,res)=>{
    const{userid} = req.body;
    try {
        const Data = await CustomerModel.find({userid:userid}).populate('userid');
        res.status(200).json(Data);
    } catch (error) {
        res.status(400).json({msg:"Something went wrong!!!"});
    }
}

const deleteItem = async(req,res)=>{
    const{id} = req.body;
    try {
       const Data = await CustomerModel.findByIdAndDelete(id);
        res.status(200).json({msg:"Item deleted successfully"});
    } catch (error) {
        res.status(400).json({msg:"Something went wrong"})
    }
}

module.exports = {
    registration,
    userLogin,
    userProfile,
    userProfileShow,
    customerRecords,
    purchasedItems,
    deleteItem
}