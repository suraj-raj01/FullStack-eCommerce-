import Product from "../models/productModel.js";

// ================= SAFE JSON PARSER =================
const safeJSON = (value, fallback) => {
  try {
    if (!value) return fallback;
    if (typeof value === "object") return value;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

// ================= CREATE OR UPDATE =================
export const saveProduct = async (req, res) => {
  try {
    // console.log(req.body,'data')
    // 🟢 parse complex fields from UI
    const variants = safeJSON(req.body.variants, []);
    const shipping = safeJSON(req.body.shipping, {});
    const tags = safeJSON(req.body.tags, []);
    const existingImages = safeJSON(req.body.images, []);

    let uploadedImages = [];

    // ================= HANDLE FILES =================
    if (req.files?.length) {
      uploadedImages = req.files.map((file) => ({
        url: file.path || file.secure_url || file.url,
      }));
    }

    // ================= MERGE IMAGES =================
    const finalImages =
      uploadedImages.length > 0
        ? [...existingImages, ...uploadedImages]
        : existingImages;

    // ================= BUILD DATA =================
    const data = {
      ...req.body,
      variants,
      shipping,
      tags,
      images: finalImages,
      defaultImage:
        req.body.defaultImage ||
        finalImages?.[0]?.url ||
        "",
    };

    // remove id if accidentally sent
    delete data.id;
    delete data._id;
    // ================= CREATE =================
    
     const product = await Product.create(data);
    return res.status(201).json({
      success: true,
      data: product,
      message:"Product created ✅",
    });
  } catch (error) {
    console.error("SAVE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 🟢 parse complex fields
    const variants = safeJSON(req.body.variants, []);
    const shipping = safeJSON(req.body.shipping, {});
    const tags = safeJSON(req.body.tags, []);
    const existingImages = safeJSON(req.body.images, []);

    let uploadedImages = [];

    // ================= HANDLE NEW FILES =================
    if (req.files?.length) {
      uploadedImages = req.files.map((file) => ({
        url: file.path || file.secure_url || file.url,
      }));
    }

    // ================= MERGE IMAGES =================
    const finalImages =
      uploadedImages.length > 0
        ? [...existingImages, ...uploadedImages]
        : existingImages;

    // ================= BUILD UPDATE DATA =================
    const updateData = {
      ...req.body,
      variants,
      shipping,
      tags,
      images: finalImages,
      defaultImage:
        req.body.defaultImage ||
        finalImages?.[0]?.url ||
        "",
    };

    // safety cleanup
    delete updateData.id;
    delete updateData._id;

    // ================= UPDATE =================
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "Product updated ✅",
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
export const getProducts = async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ONE =================
export const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted 🗑️",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};