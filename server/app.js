import express from 'express'
const app = express();
import cors from 'cors'
import bodyparser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));

import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/upload.js'
import heroRoutes from './routes/heroRoutes.js'
import navbarRoutes from './routes/navbarRoutes.js'
import roleRoutes from './routes/auth/rolesRoutes.js'
import permissionRoutes from './routes/auth/permissionRoutes.js'
import userRoutes from './routes/auth/userRoutes.js'


app.use('/api/admin/category',categoryRoutes)
app.use('/api/admin/upload',uploadRoutes)
app.use('/api/admin/products',productRoutes)
app.use('/api/admin/heroes',heroRoutes)
app.use('/api/admin/navbar',navbarRoutes)
app.use('/api/admin/roles',roleRoutes)
app.use('/api/admin/permissions',permissionRoutes)
app.use('/api/admin/users',userRoutes)

app.listen(PORT,()=>{
    console.log(`Server run on port ${PORT}`);
});