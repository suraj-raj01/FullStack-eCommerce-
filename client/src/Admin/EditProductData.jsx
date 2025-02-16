import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import BASE_URL from "../Config";
import { message } from "antd";
const EditProductData = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const categories = {
    Laptops: ["Dell", "Hp", "Lenovo", "Asus", "Acer","Zebronics","HCL"],
    Mobiles: ["Samsung", "Vivo", "Oppo","Oneplus", "Iphone","Nokia","Realme","Redmi","Micromax","Nothing","Google Pixel"],
    TV: ["Samsung","Lg","Realme","Xiomi","Micromax","Sony","Apple"],
    Keyboard:["Zebronics","Dell","Intex","Lenovo","Samsung","Hp","Acer"],
    Mouse: ["Zebronics","Dell","Intex","Lenovo","Samsung","Hp","Acer"],
    Watch: ["Hmt","Sonata","Limestone","Chopard","Fossil"],
    SmartWatch: ["Boat","Noise","Samsung","Realme","Apple","Fastrack"],
  };

  const loadData = async() =>{
    let api = `${BASE_URL}/admin/editproductdata`;
    try {
        const response = await axios.post(api,{id:id});
        setInput(response.data);
        setSelectedCategory(response.data.category);
        setSelectedSubcategory(response.data.subcategory);
        setImages(response.data.images)
        console.log(response.data.images[0])
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    loadData();
  },[]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSubcategories(categories[category] || []);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in input) {
      formData.append(key, input[key]);
    }
    formData.append("category", selectedCategory);
    formData.append("subcategory", selectedSubcategory);
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }

    try {
      const api=`${BASE_URL}/admin/editproductsave`;
      await axios.post(api,{id:id}, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success("Product uploade Successfully!!!");
    } catch (error) {
      message.error(error)
    }
  };

  return (
    <>
      <div id="insert-form" className="mt-2" >
      <h4 className="text-center p-2">Insert Data Form</h4>
      <Form onSubmit={handleSubmit}>
        <div id="box">
        <Form.Group className="mb-3">
          <br />
          <Form.Label>Select Product Category:</Form.Label>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Subcategory:</Form.Label>
          <Form.Select value={selectedSubcategory} onChange={handleSubcategoryChange} disabled={!selectedCategory}>
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
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
          <Form.Control type="Number" name="price" value={input.price || ""} onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Description</Form.Label>
          <Form.Control type="text" name="description" value={input.description || ""} onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

          <Form.Label>Submit Product Data</Form.Label>
        <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
      </div>
    </>
  );
};

export default EditProductData;
