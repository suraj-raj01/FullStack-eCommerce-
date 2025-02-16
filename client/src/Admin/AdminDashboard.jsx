import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
const AdminDashboard = () => {
  return (
    <>
      <Header/>
      <div id="dashboard">
        <div id="nav">
        <Nav.Link as={Link} to="adminprofile">Profile</Nav.Link>
        <Nav.Link as={Link} to="insert">Insert Data</Nav.Link>
        <Nav.Link as={Link} to="update">Update</Nav.Link>
        </div>
        <div id="content-data">
            <Outlet/>
        </div>
        <div id="ads">
          {/* <b>advertisement</b> */}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AdminDashboard;
