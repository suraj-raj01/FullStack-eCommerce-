import express from 'express'
import { createUser, deleteUser, forgotPassword, getUserById, getUsers, searchUser, updatePassword, updateUser, userLogin, verifyEmail } from '../../controllers/auth/userController.js';
const route = express.Router();

route.post("/createuser",createUser)
route.get("/getuser",getUsers)
route.get("/getuserbyid/:id",getUserById)
route.post("/searchuser/:id",searchUser)
route.put("/updateuser/:id",updateUser)
route.delete("/deleteuser/:id",deleteUser)
route.post("/login",userLogin)
route.post("/verify-email",verifyEmail)
route.post("/forgot-password",forgotPassword)
route.post("/update-password",updatePassword)

export default route;