import React, { useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import { Link, Outlet } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Crousel from "../Components/Crousel";
import { useContext } from "react";
import { myLoginContext } from "../Context/LoginContext";
import axios from "axios";
import BASE_URL from "../Config";
import { Button } from "react-bootstrap";
import { Slider } from "antd";

let start =0;
let end = 0;
const onChange = (value) => {
  start = value
  console.log('onChange: ', start);
};
const onChangeComplete = (value) => {
  end = value;
  console.log("onChangeComplete: ", end);
};

const Home = () => {
  const { setIsLogedIn } = useContext(myLoginContext);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const api = `${BASE_URL}/user/profile`;
    try {
      const response = await axios.post(api, null, {
        headers: { Authorization: token },
      });
      localStorage.setItem("userid", response.data._id);
      localStorage.setItem("username", response.data.name);
      setIsLogedIn(true);
    } catch (error) {
      console.log(error)
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
          {/* <b className="text-start">Fileter by price ₹</b>
          <Button>
            <i class="fas fa-circle-arrow-up"></i> Low To High{" "}
            <i class="fas fa-circle-arrow-down"></i>
          </Button>
          <Button>
            <i class="fas fa-circle-arrow-down"></i> High To Low{" "}
            <i class="fas fa-circle-arrow-up"></i>
          </Button>
          <br />
          <b>Filter by name</b>
          <Form.Select
            aria-label="Default select example"
            style={{ backgroundColor: "#e8e6e6d8", fontWeight: "500" }}
          >
            <option>Select Category</option>
            <option value="1">Keyboards</option>
            <option value="1">Laptops</option>
            <option value="2">Mobiles</option>
            <option value="3">Mouse</option>
            <option value="3">Smart Watches</option>
            <option value="3">Watches</option>
          </Form.Select>
          <br />
          <b>Price Range</b>
          <Slider
            range
            step={1}
            defaultValue={[20, 50]}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            style={{width:'90%'}}
          />

          <br />
          <b>Enter range</b>
          <div id="range">
            <input type="number" placeholder="0.00 ₹" />
            TO
            <input type="number" placeholder="1000000.00 ₹" />
          </div> */}
        </div>
        <div id="filterdata">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
