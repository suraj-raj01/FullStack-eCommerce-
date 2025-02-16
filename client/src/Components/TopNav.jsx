import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TopNav = () => {
  const ProductData = useSelector(state=>state.addtoCart.cart);
  let count = ProductData.length;
  console.log(ProductData)
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="home" style={{fontWeight:'bold'}}> 
            eCommerce
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
            </Nav>
            
            <Nav>
              {/* <div className="vr"/> */}
              <Nav.Link as={Link} to="cartitems">
              {"Carts"} <i class="fas fa-cart-shopping"></i><sup><span id="cart-count">{count}</span></sup> {" "}
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                <i class="fas fa-heart"></i> {"Likes"}{" "}
              </Nav.Link>
              {/* <div className="vr"/> */}
              <Nav.Link  as={Link} to="login">
                <i class="fas fa-circle-user"></i> {"SignIn"}
              </Nav.Link>
              {/* <div className="vr" /> */}
                {/* <Nav.Link as={Link} to="userdashboard/userprofile">
                  <i class="fas fa-bars"></i>
                  {" My Profile"}
                </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNav;
