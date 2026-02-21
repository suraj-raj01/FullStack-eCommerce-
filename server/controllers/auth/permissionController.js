import PermissionModel from "../../models/auth/permissionModel.js"
import mongoose from "mongoose";

// create permission
export const createPermission = async (req, res) => {
    const body = req.body;
    try {
        const Data = await PermissionModel.create({
            ...body
        })
        res.status(201).json({ data: Data, message: "Role created Successfull!!" })
    } catch (error) {
        res.status(500).json(error)
    }
}

// get permission with pagination
export const getPermission = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            PermissionModel.find().skip(skip).limit(limit).sort({ updatedAt: -1 }),
            PermissionModel.countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            data,
            currentPage: page,
            totalPages,
            totalItems: total,
            message: "Permission fetched successfully"
        });
    } catch (error) {
        console.error("Pagination Error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// delete permission
export const deletePermission = async (req, res) => {
    const { id } = req.params;
    try {
        await PermissionModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Permission Deleted Successfull" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}

// update permission
export const updatePermission = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id is required",
            })
        }

        const data = req.body

        const updatedPermission = await PermissionModel.findByIdAndUpdate(
            id,
            data, // ✅ correct
            { new: true }
        )

        if (!updatedPermission) {
            return res.status(404).json({
                message: "Permission not found",
            })
        }

        return res.status(200).json({
            message: "Permission updated successfully",
            data: updatedPermission,
        })
    } catch (error) {
        console.error("Update permission error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
}

// search permission by name or id
export const searchPermission = async (req, res) => {
    const { id } = req.params;
    try {
        const searchConditions = [
            { permission: { $regex: id, $options: "i" } }
        ]
        if (mongoose.Types.ObjectId.isValid(id)) {
            searchConditions.push({ _id: id });
        }

        const data = await PermissionModel.find({
            $or: searchConditions
        })

        res.status(200).json({ data, message: "Search results" });
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error.message }, { status: 500 })
    }
}
