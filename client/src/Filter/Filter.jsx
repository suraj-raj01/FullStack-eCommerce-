import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Form, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button"

const Filter = () => {
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [selectedOption,setSelectedOption] = useState('');
  const navigate = useNavigate();
  
  const showRadio = () => {
    setStatus(true);
    setStatus1(false);
    setStatus2(false);
  };
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
  
  const handlePriceChange=async(e)=>{
    setSelectedOption(e.target.value)
    console.log(selectedOption);
    navigate(`/filter/filterbyprice/${selectedOption}`)
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
                label="Less than 1000 ₹"
                type="radio"
                name="group1"
                value="1000"
                onChange={handlePriceChange}
                checked={selectedOption==='1000'}
              />
              <br />
              <Form.Check
                inline
                label="Less than 5000 ₹"
                type="radio"
                name="group1"
                value="5000"
                onChange={handlePriceChange}
                checked={selectedOption==='5000'}
              />
              <br />
              <Form.Check
                inline
                label="Less than 10000 ₹"
                type="radio"
                name="group1"
                value="10000"
                onChange={handlePriceChange}
                checked={selectedOption==='10000'}
              />
              <br />
              <Form.Check
                inline
                label="upto 10000 ₹"
                type="radio"
                name="group1"
                value="500000"
                onChange={handlePriceChange}
                checked={selectedOption==='500000'}
              />
              <br />
              <Button variant="success" size="sm" className="mt-2" style={{padding:'6px 15px'}}>Submit</Button>
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
            />
            <Button variant="success" size="sm" className="mt-2" style={{padding:'6px 15px'}}>Search</Button>
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
                <Form.Select aria-label="Default select example" style={{width:'190px'}}>
              <option>Select Category</option>
              <option value="1">Mobile</option>
              <option value="2">Laptop</option>
              <option value="3">TV</option>
              <option value="3">Watch</option>
              <option value="3">Keyboard</option>
              <option value="3">Mouse</option>
            </Form.Select>
            <Button variant="success" size="sm" className="mt-2" style={{padding:'6px 15px'}}>Submit</Button>
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
