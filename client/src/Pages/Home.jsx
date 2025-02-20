import React, { useEffect } from "react";
import Categories from "../Categories/Categories";
import { Link, Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ProductCategory from "../Components/ProductCategory";
import Crousel from "../Components/Crousel";
import { useContext } from "react";
import { myLoginContext } from "../Context/LoginContext";
import axios from "axios";
import BASE_URL from "../Config";
import Form from 'react-bootstrap/Form'

const Home = () => {
  const { setIsLogedIn } = useContext(myLoginContext);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
      const api = `${BASE_URL}/user/profile`;
    try {
      const response = await axios.post(api,null, {headers: {"Authorization":token},
      });
      console.log(response.data);
      localStorage.setItem("userid", response.data._id);
      localStorage.setItem("username", response.data.name);
      setIsLogedIn(true);
    } catch (error) {
      alert(error);
  }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, []);

  return (
    <>
      <Crousel />
      {/* <ProductCategory/> */}
      <hr />
      <br />
      <Categories />
      <hr />
      <div id="hero">
        <div id="filter">
        {/* <Form.Select>
        <option>Filter Products</option>
        <option>Laptops</option>
        <option>Mobiles</option>
        <option>TV</option>
        <option>Keyboards</option>
        <option>Mouse</option>
        <option>Watches</option>
        <option>Smart Watches</option>
      </Form.Select> */}
        {/*  */}
        </div>
        <div id="filterdata">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
