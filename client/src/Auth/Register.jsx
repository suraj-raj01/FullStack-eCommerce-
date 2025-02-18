import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import BASE_URL from "../Config";
import { toast,ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  const handleSubmit = async() => {
    const api = `${BASE_URL}/user/registration`;
    try {
        const res = await axios.post(api,input);
        toast.success(res.data);
        navigate("/login")
    } catch (error) {
      toast.success(error);
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div id="form">
      <Form>
      <h4 className="text-center">Registration Form</h4>
      <br />

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Control placeholder="Enter your name" 
              name="name"
              value={input.name}
              onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Control placeholder="Shipping Address" 
        name="shippingaddress"
        value={input.shippingaddress}
        onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Control placeholder="Apartment, studio, or floor" 
        name="apartment"
        value={input.apartment}
        onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Control type="number" placeholder="Contact no" 
        name="mobileno"
        value={input.mobileno}
        onChange={handleInput}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Control placeholder="Pin Code"
          name="pincode"
          value={input.pincode}
          onChange={handleInput}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Control placeholder="District"
          name="district"
          value={input.district}
          onChange={handleInput}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Control placeholder="State"
          name="state"
          value={input.state}
          onChange={handleInput}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control type="email" placeholder="Enter email" 
          name="useremail"
          value={input.useremail}
          onChange={handleInput}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control type="password" placeholder="Password" 
          name="password"
          value={input.password}
          onChange={handleInput}
        />
        </Form.Group>
      </Row>
      <br />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <br /><br />
      <b onClick={login} style={{ cursor: "pointer" }}>
            already have an account
          </b>
    </Form>
        {/* <Form>
          <h4 className="text-center">Registration Form</h4>
          <br />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={input.name}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="useremail"
              value={input.useremail}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="number"
              placeholder="Enter Mobile no"
              name="mobileno"
              value={input.mobileno}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </Form.Group>
          <br />

          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <br />
          <br />
          <b onClick={login} style={{ cursor: "pointer" }}>
            already have an account
          </b>
          <br />
        </Form> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
