import express from 'express'
import { createPermission, deletePermission, getPermission, searchPermission, updatePermission } from '../../controllers/auth/permissionController.js';
const route = express.Router();

route.post("/createpermission",createPermission)
route.get("/getpermission",getPermission)
route.delete("/deletepermission/:id",deletePermission)
route.put("/updatepermission/:id",updatePermission)
route.post("/searchpermission/:id",searchPermission)

export default route;