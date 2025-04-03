import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Form, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button"

const Filter = () => {
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [priceChange,handlePriceChange] = useState('');
  const [input,handleInput] = useState("");
  const [category, handleCategory] = useState("")
  const navigate = useNavigate();
  
  const showRadio = () => {
    setStatus(true);
    setStatus1(false);
    setStatus2(false);
  };
  useEffect(()=>{
    navigate("/filter/filterbyprice/1000");
    setStatus(true);
  },[])
  const showRadio1 = () => {
    setStatus(false);
    setStatus1(true);
    setStatus2(false);
  };
  const showRadio3 = () => {
    setStatus(false);
    setStatus1(false);
    setStatus2(true);
  };
  
  const handleFilter=async()=>{
    navigate(`/filter/filterbyprice/${priceChange}`)
  } 

  const inputSubmit=(e)=>{
    e.preventDefault();
    navigate(`/filter/filterbyname/${input}`)
  }

  const handleCategorySubmit=(e)=>{
    e.preventDefault();
    navigate(`/filter/filterbycategory/${category}`)
  }

  return (
    <>
      <div id="hero">
        <div id="filter">
          <Nav.Link
            id="filter-btn"
            as={Link}
            onClick={showRadio}
            to="filterbyprice"
          >
            Filter By Price
          </Nav.Link>
          {status ? (
            <Form>
              <Form.Check
                inline
                label="0 - 1000 ₹"
                type="radio"
                name="group1"
                value="1000"
                onChange={(e)=>{handlePriceChange(e.target.value)}}
              />
              <br />
              <Form.Check
                inline
                label="1000 - 5000 ₹"
                type="radio"
                name="group1"
                value="5000"
                onChange={(e)=>{handlePriceChange(e.target.value)}}
              />
              <br />
              <Form.Check
                inline
                label="5000 - 10000 ₹"
                type="radio"
                name="group1"
                value="10000"
                onChange={(e)=>{handlePriceChange(e.target.value)}}
              />
              <br />
              <Form.Check
                inline
                label="upto 10000 ₹"
                type="radio"
                name="group1"
                value="500000"
                onChange={(e)=>{handlePriceChange(e.target.value)}}
              />
              <br />
              <Button variant="success" size="sm" className="mt-2" style={{padding:'6px 15px'}} onClick={handleFilter}>Submit</Button>
            </Form>
          ) : (
            ""
          )}
          <Nav.Link id="filter-btn" as={Link} to="filterbyname" onClick={showRadio1}>
            Filter By Name
          </Nav.Link>
          {
            status1?(
              <Form>
            <Form.Control
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Enter product name"
              name=""
              value={input.name}
              onChange={(e)=>{handleInput(e.target.value)}}
            />
            <Button variant="success" size="sm" className="mt-2" style={{padding:'6px 15px'}} 
            onClick={inputSubmit}
            >Search</Button>
          </Form>
            ):(
              ""
            )
          }
          <Nav.Link id="filter-btn" as={Link} to="filterbycategory" onClick={showRadio3}>
            Filter By Category
          </Nav.Link>
          {
            status2?(
              <Form>
              <Form.Select aria-label="Default select example" style={{width:'190px'}} onChange={(e)=>{handleCategory(e.target.value)}}>
              <option>Select Category</option>
              <option name="" value="Mobile">Mobile</option>
              <option name="" value="Laptop">Laptop</option>
              <option name="" value="TV">TV</option>
              <option name="" value="Watch">Watch</option>
              <option name="" value="Keyboard">Keyboard</option>
              <option name="" value="Mouse">Mouse</option>
            </Form.Select>
            <Button variant="success" size="sm" className="mt-2" style={{padding:'6px 15px'}} onClick={handleCategorySubmit}>Submit</Button>
              </Form>
            ):(
              ""
            )
          }
        </div>
        <div id="filterdata">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Filter;
