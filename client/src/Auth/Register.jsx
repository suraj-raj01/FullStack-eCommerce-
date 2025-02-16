import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { message } from "antd";
import BASE_URL from "../Config";

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
    let api = `${BASE_URL}/admin/registration`;
    try {
        const response = await axios.post(api,input);
        console.log(response.data);
        navigate("/login")
    } catch (error) {
        message.error(error.response.data.msg);
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
        </Form>
      </div>
    </>
  );
};

export default Register;
