import Hero from "../models/Hero.js";

// ================= CREATE HERO =================
export const createHero = async (req, res) => {
  try {
    const data = req.body;
    const hero = await Hero.create(data);
    return res.status(201).json({
      success: true,
      data: hero,
      message: "Hero created ✅",
    });
  } catch (error) {
    console.error("CREATE HERO ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE HERO =================
export const updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Hero.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updated,
      message: "Hero updated ✅",
    });
  } catch (error) {
    console.error("UPDATE HERO ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
export const getHeroes = async (req, res) => {
  try {
    const data = await Hero.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ONE =================
export const getHeroById = async (req, res) => {
  try {
    const data = await Hero.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Hero not found" });
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
export const deleteHero = async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Hero deleted 🗑️",
    });
  } catch (error) {
    console.error("DELETE HERO ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};