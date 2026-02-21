import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../Config";
import { message } from "antd";

const ProductInsert = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [images, setImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // 🔹 Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        message.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Handle category change
  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);

    const selected = categories.find(c => c.name === categoryName);
    setSubcategories(selected?.brands || []);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(input).forEach(key => {
      formData.append(key, input[key]);
    });

    formData.append("category", selectedCategory);
    formData.append("subcategory", selectedSubcategory);

    images.forEach(file => {
      formData.append("files", file);
    });

    try {
      await axios.post(`${BASE_URL}/admin/productsave`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      message.success("Product uploaded successfully");
      navigate("/admindashboard/update");

    } catch (error) {
      message.error("Upload failed");
    }
  };

  return (
    <div id="insert-form" className="mt-2">
      <h4 className="text-center p-2">Insert Data Form</h4>

      <Form onSubmit={handleSubmit}>
        <div id="box">

          <Form.Group className="mb-3">
            <Form.Label>Select Product Category</Form.Label>
            <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Subcategory</Form.Label>
            <Form.Select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              disabled={!selectedCategory}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter Product Name</Form.Label>
            <Form.Control type="text" name="name" value={input.name || ""} onChange={handleInput} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter Brand</Form.Label>
            <Form.Control type="text" name="brand" value={input.brand || ""} onChange={handleInput} />
          </Form.Group>

        </div>

        <div id="box">

          <Form.Group className="mb-3">
            <Form.Label>Enter Price</Form.Label>
            <Form.Control type="number" name="price" value={input.price || ""} onChange={handleInput} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter Description</Form.Label>
            <Form.Control type="text" name="description" value={input.description || ""} onChange={handleInput} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </div>
      </Form>
    </div>
  );
};

export default ProductInsert;
