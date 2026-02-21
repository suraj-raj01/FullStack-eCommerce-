
import Category from "../models/Categories.js";

/**
 * Create Category
 */
export const createCategory = async (req, res) => {
  try {
    const { categories, subcategories } = req.body;
    console.log(req.body);

    if (!categories) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ categories });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = new Category({ categories, subcategories });

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Get All Categories
 */
export const getAllCategories = async (_req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Get Category By ID
 */
export const getCategoryById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Update Category Name
 */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    console.log("ID:", id)
    console.log("BODY:", JSON.stringify(data, null, 2))

    const updated = await Category.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    )

    if (!updated) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json(updated)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}


/**
 * Delete Category
 */
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Add Subcategory
 */
export const addSubcategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.subcategories.push({ name, brands: [] });

    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Add Brand to Subcategory
 */
export const addBrand = async (req, res) => {
  try {
    const { subcategoryName, brand } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const sub = category.subcategories.find(
      (s) => s.name === subcategoryName
    );

    if (!sub) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    sub.brands.push(brand);

    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Remove Brand
 */
export const removeBrand = async (req, res) => {
  try {
    const { subcategoryName, brand } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const sub = category.subcategories.find(
      (s) => s.name === subcategoryName
    );

    if (!sub) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    sub.brands = sub.brands.filter((b) => b !== brand);

    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Remove Subcategory
 */
export const removeSubcategory = async (req, res) => {
  try {
    const { subcategoryName } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.subcategories = category.subcategories.filter(
      (s) => s.name !== subcategoryName
    );

    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
