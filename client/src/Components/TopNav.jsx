import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';

const TopNav = () => {
  const ProductData = useSelector(state=>state.addtoCart.cart);
  let count = ProductData.length;
  console.log(ProductData)
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
