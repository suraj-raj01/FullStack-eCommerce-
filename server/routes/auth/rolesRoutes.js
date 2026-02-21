import express from 'express'
import { createRole, deleteRole, getRole, searchRole, updateRole } from '../../controllers/auth/roleController.js';
const route = express.Router();

route.post("/createrole", createRole)
route.get("/getrole", getRole)
route.delete("/deleterole/:id", deleteRole)
route.put("/updaterole/:id", updateRole)
route.post("/searchrole/:id", searchRole)

export default route;