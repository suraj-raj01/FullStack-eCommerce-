import React from "react";
import Categories from "../Categories/Categories";
import { Outlet } from "react-router-dom";
import ProductCategory from "../Components/ProductCategory";
import Crousel from "../Components/Crousel";

const Home = () => {

  return (
    <>
     <Crousel/>
      {/* <ProductCategory/> */}
      <hr />
      <br />
      <Categories/>
      <hr />
      <div id="hero">
        <div id="filter">
       
        </div>
        <div id="filterdata">
        <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Home;
