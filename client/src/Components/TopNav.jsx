import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from "react";
import { myLoginContext } from "../Context/LoginContext";

const TopNav = () => {
  const ProductData = useSelector(state=>state.addtoCart.cart);
  let count = ProductData.length;
  const navigate = useNavigate();
  const {isLogedIn, setIsLogedIn} = useContext(myLoginContext);

  const userDashboard=()=>{
    navigate("/userdashboard")
  }

  const[name,setname] = useState("")
  useEffect(()=>{
    setname(localStorage.getItem("username"))
  })
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="home" style={{fontWeight:'bold'}}> 
            ShopingCart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="about">
                About
              </Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="home/laptops">Laptops</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="home/mobiles">Mobiles</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="home/tv">TV</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="home/keyboard">Keyboard</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="home/mouse">Mouse</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="home/watches">Watches</NavDropdown.Item>
            </NavDropdown>
            </Nav>

            <Nav>
              {/* <div className="vr"/> */}
              <Nav.Link as={Link} to="cartitems">
              {"Carts"} <i class="fas fa-cart-shopping"></i><sup><span id="cart-count">{count}</span></sup> {" "}
              </Nav.Link>
              <Nav.Link as={Link} to="likes">
                <i class="fas fa-heart"></i> {"Likes"}{" "}
              </Nav.Link>
              {isLogedIn?(
                  <Nav.Link  as={Link} to="userdashboard" >
                  <i class="fas fa-user"></i> Profile
                </Nav.Link>
              ):(
                <Nav.Link  as={Link} to="login">
                <i class="fas fa-circle-user"></i> {"SignIn"}
              </Nav.Link>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNav;
