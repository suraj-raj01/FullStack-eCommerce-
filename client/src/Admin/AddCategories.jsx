import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../Config";
import { message } from "antd";

const AddCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [brands, setBrands] = useState([""]);

  // Handle brand change
  const handleBrandChange = (index, value) => {
    const updatedBrands = [...brands];
    updatedBrands[index] = value;
    setBrands(updatedBrands);
  };

  // Add new brand input
  const addBrandField = () => {
    setBrands([...brands, ""]);
  };

  // Remove brand input
  const removeBrandField = (index) => {
    const updatedBrands = brands.filter((_, i) => i !== index);
    setBrands(updatedBrands);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredBrands = brands.filter((b) => b.trim() !== "");

    if (!categoryName) {
      return message.warning("Category name is required");
    }

    if (filteredBrands.length === 0) {
      return message.warning("Add at least one brand");
    }

    try {
      await axios.post(`${BASE_URL}/api/categories`, {
        name: categoryName,
        brands: filteredBrands,
      });

      message.success("Category added successfully");

      // Reset form
      setCategoryName("");
      setBrands([""]);
    } catch (error) {
      message.error("Failed to add category");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h4 className="text-center mb-3">Add New Category</h4>

      <Form onSubmit={handleSubmit}>

        {/* Category Name */}
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </Form.Group>

        {/* Brands */}
        <Form.Label>Brands</Form.Label>

        {brands.map((brand, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Control
              type="text"
              value={brand}
              placeholder="Enter brand"
              onChange={(e) => handleBrandChange(index, e.target.value)}
            />

            {brands.length > 1 && (
              <Button
                variant="danger"
                className="ms-2"
                onClick={() => removeBrandField(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button variant="secondary" onClick={addBrandField} className="mb-3">
          + Add Brand
        </Button>

        <div>
          <Button variant="primary" type="submit">
            Save Category
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default AddCategories;
