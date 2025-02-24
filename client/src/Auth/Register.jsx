import React, { useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import BASE_URL from "../Config";
import { toast} from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  useEffect(()=>{
    if (localStorage.getItem("username"))
    {
      navigate("/home");
    }
  },[])

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const api = `${BASE_URL}/user/userregister`;
       try {
         const res = await axios.post(api,input);
         toast.success("Registration successfully completed!!");
        console.log(res.data)
         navigate("/login")
       } catch (error) {
          console.log(error);
       }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div id="form">
      <Form>
        <h4 className="text-center">User Registration Form</h4>
        <br />
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control type="text" placeholder="Enter name" 
          name="name" value={input.name} onChange={handleInput}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control type="number" placeholder="Mobile no" 
          name="mobileno" value={input.mobileno} onChange={handleInput}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <textarea type="text" placeholder="Shipping address" rows='3' style={{width:'100%'}}
        name="shippingaddress" value={input.shippingaddress} onChange={handleInput}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Control placeholder="Apartment, Building Name" 
        name="apartment" value={input.apartment} onChange={handleInput}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Control placeholder="Pin Code"
          name="pincode" value={input.pincode} onChange={handleInput}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Control placeholder="District"
          name="district" value={input.district} onChange={handleInput}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Control placeholder="State"
          name="state" value={input.state} onChange={handleInput}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Control placeholder="Email" type="email"
          name="useremail" value={input.useremail} onChange={handleInput}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Control placeholder="Password" type="password"
          name="password" value={input.password} onChange={handleInput}
          />
        </Form.Group>
      </Row>


      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <br />
        <br />
        <b onClick={login} style={{cursor:'pointer'}}>aleready have an account</b>
        <br />
    </Form>
      </div>
    </>
  );
};

export default Register;
