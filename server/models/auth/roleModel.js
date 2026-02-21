import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    permissionId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "permissions",
            require: false,
        },
    ],
}, { timestamps: true });

export default mongoose.models.roles || mongoose.model("roles", roleSchema);