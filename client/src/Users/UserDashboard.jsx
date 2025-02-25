import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { myLoginContext } from "../Context/LoginContext";
import { toast, ToastContainer } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { isLogedIn, setIsLogedIn } = useContext(myLoginContext);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      toast.error("Login Please!!!");
      navigate("/home");
    }
  }, []);

  const logout = () => {
    toast.warning("Logout Successfully!!!");
    localStorage.clear();
    setIsLogedIn(false);
    navigate("/home");
  };
  const home = () => {
    navigate("/home");
  };
  return (
    <>
      <div id="header">
        <div id="box">
          <h3>User Dashboard</h3>
        </div>
        <div id="box">
          <Button size="sm" variant="danger" onClick={home}>
            <i class="fas fa-house"></i> Home
          </Button>
          <Button size="sm" variant="danger" onClick={logout}>
            <i class="fas fa-right-to-bracket"></i> Logout
          </Button>
          {/* <i class="fas fa-circle-user" id="user-icon"></i> */}
        </div>
      </div>
      <div id="dashboard">
        <div id="nav">
          <Nav.Link as={Link} to="userprofile">
            <i class="fas fa-user"></i> Profile
          </Nav.Link>
          <Nav.Link as={Link} to="purchases">
            <i class="fas fa-bag-shopping"></i> Your Orders
          </Nav.Link>
        </div>
        <div id="content-data">
          <Outlet />
        </div>
      </div>
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default UserDashboard;
