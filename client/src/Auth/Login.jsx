import { message } from "antd";
import axios from "axios";
import React, { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const[input,setInput] = useState({});

    useEffect(()=>{
      if (localStorage.getItem("username"))
      {
        navigate("/home");
      }
    },[])

    const handleInput=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInput((values)=>({...values,[name]:value}));
        console.log(input);
    }

    const handleSubmit=async()=>{
        let api = `${BASE_URL}/user/userlogin`;
        try {
            const response = await axios.post(api,input);
            toast.success('Login Successfully Completed!!!');
            localStorage.setItem("token",response.data.token);
            console.log(response.data.token)
            navigate("/home")
        } catch (error) {
          toast.error(error.response.data.msg);
        }
    }

    const register=()=>{
        navigate("/register")
    }
  return (
    <>
    <br />
    <br />
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
      <ToastContainer />
     </div>
     <br /><br /><br />
    </>
  );
};

export default Login;
