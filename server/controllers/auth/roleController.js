import RoleModel from "../../models/auth/roleModel.js"
import mongoose from "mongoose";
// create role
export const createRole = async (req, res) => {
    const body = req.body;
    console.log(body)
    try {
        const Data = await RoleModel.create({
            ...body
        })
        res.status(201).json({ data: Data, message: "Role created Successfull!!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// get roles with pagination
export const getRole = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            RoleModel.find()
                .populate("permissionId")
                .skip(skip)
                .limit(limit).sort({ updatedAt: -1 }),
            RoleModel.countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            data,
            currentPage: page,
            totalPages,
            totalItems: total,
            message: "Fetched roles successfully"
        });
    } catch (error) {
        console.error("Get Roles Error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// delete role
export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await RoleModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Role deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error.message })
    }
}

// update role
export const updateRole = async (req, res) => {
    const { ...data } = req.body;
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ error: "Id is required!!" });
    }
    try {
        const updatedRole = await RoleModel.findByIdAndUpdate(id, data, { new: true });

        if (!updatedRole) {
            return res.status(404).json({ error: "Role not found!" });
        }
        res.status(200).json({ message: "Role Updated Successfully!", data: updatedRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!", error: error.message });
    }
};

// search Roles by name or id

export const searchRole = async (req, res) => {
    const { id } = req.params;

    if (!id || id.trim() === "") {
        return res.status(400).json({ message: "Search keyword (id or name) is required" });
    }

    try {
        const searchConditions = [
            { role: { $regex: id, $options: "i" } }
        ]
        if (mongoose.Types.ObjectId.isValid(id)) {
            searchConditions.push({ _id: id });
        }

        const data = await RoleModel.find({
            $or: searchConditions
        }).populate("permissionId");

        res.status(200).json({ data, message: "Search results" });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
