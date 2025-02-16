import React from "react";
import Footer from "../Components/Footer";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button"
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();
    const logout=()=>{
        navigate("/home")
    }
  return (
    <>
      <div id="header">
        <div id="box">
          <h3>User Dashboard</h3>
        </div>
        <div id="box">
          <Button size="sm" variant="danger" onClick={logout}>
            Logout
          </Button>
          <i class="fas fa-circle-user"></i>
        </div>
      </div>
      <div id="dashboard">
        <div id="nav">
          <Nav.Link as={Link} to="userprofile">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="#">
            Display
          </Nav.Link>
        </div>
        <div id="content-data">
          <Outlet />
        </div>
        <div id="ads">
        <b>advertisement</b>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
