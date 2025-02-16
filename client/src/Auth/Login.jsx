import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";

const Login = () => {
    const navigate = useNavigate();
    const[input,setInput] = useState({});

    const handleInput=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInput((values)=>({...values,[name]:value}));
        console.log(input);
    }

    const handleSubmit=async()=>{
        let api = `${BASE_URL}/admin/login`;
        try {
            const response = await axios.post(api,input);
            message.success(response.data);
            if(response.data.useremail==="admin123@gmail.com")
            navigate("/admindashboard")
            
        } catch (error) {
            message.error(error.response.data.msg);
        }
    }

    const register=()=>{
        navigate("/register")
    }
  return (
    <>
     <div id="form">
     <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h4 className="text-center">Login Form</h4>
          <br />
          <Form.Control type="email" placeholder="Enter email" 
          name="useremail"
          value={input.useremail}
          onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" 
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
        <b onClick={register} style={{cursor:'pointer'}}>don't have an account</b>
        <br />
      </Form>
     </div>
    </>
  );
};

export default Login;
