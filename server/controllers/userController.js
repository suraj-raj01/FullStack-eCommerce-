const UserModel = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/customerModel")

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

const userLogin = async(req,res)=>{
    const{ useremail, password } = req.body;
    try {
        const User = await UserModel.findOne({useremail:useremail});
        const comparePass = await bcrypt.compare(password,User.password);
        if(!User){
            res.status(400).json("Invalid Username")
        }
        else if(!comparePass){
            res.status(400).json("Invalid Password!!");
        }
        else{
        const token = await jwt.sign({id:User._id}, process.env.JWT_SECRET, { expiresIn: '7 days'});  
        res.status(200).send({token:token});
        }
    } catch (error) {
        res.status(400).send({msg:"Something went wrong!!!"})
    }
}

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

module.exports = {
    registration,
    userLogin,
    userProfile,
    userProfileShow,
    customerRecords,
    purchasedItems
}