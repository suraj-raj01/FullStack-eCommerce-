import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema(
    {
       logo: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        trim: true,
      },
      signin: {
        type: String,
        required: true,
        trim: true,
      },
      
    },
    { timestamps: true }
);

export default mongoose.model("Navbar", navbarSchema);
