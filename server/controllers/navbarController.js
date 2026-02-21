import Navbar from "../models/Navbar.js";

// ================= CREATE Navbar =================
export const createNavbar = async (req, res) => {
  try {
    const data = req.body;
    const hero = await Navbar.create(data);
    return res.status(201).json({
      success: true,
      data: hero,
      message: "Navbar created ✅",
    });
  } catch (error) {
    console.error("CREATE NAVBAR ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE Navbar =================
export const updateNavbar = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Navbar.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updated,
      message: "Navbar updated ✅",
    });
  } catch (error) {
    console.error("UPDATE NAVBAR ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
export const getNavbar = async (req, res) => {
  try {
    const data = await Navbar.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ONE =================
export const getNavbarById = async (req, res) => {
  try {
    const data = await Navbar.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Navbar not found" });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
export const deleteNavbar = async (req, res) => {
  try {
    await Navbar.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Navbar deleted 🗑️",
    });
  } catch (error) {
    console.error("DELETE NAVBAR ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};