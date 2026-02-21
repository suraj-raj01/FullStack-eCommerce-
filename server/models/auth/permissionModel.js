import mongoose from "mongoose"

const permissionSchema = new mongoose.Schema({
    permission: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.permissions || mongoose.model("permissions", permissionSchema);