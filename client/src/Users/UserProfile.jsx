import React, { useEffect,useState } from "react";
import BASE_URL from "../Config";
import "../Style/dashboard.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const UserProfile = () => {
  const myid = localStorage.getItem("userid");
  const [mydata,setMyData] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
        if (!localStorage.getItem("username"))
        {
          toast.warning("Please Login !!!")
          navigate("/home");
        }
      },[])

  const loadData = async() =>{
    let api = `${BASE_URL}/user/userprofileshow`;
    try {
      const response = await axios.post(api,{id:myid});
      setMyData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }

  useEffect(()=>{
    loadData();
  },[])
  return (
    <>
    <div id="profile">
    <b><i class="fas fa-user"></i> Name : {mydata.name}</b>
    <b><i class="fas fa-mobile-screen-button"></i> Mobile : {mydata.mobileno}</b>
    <b><i class="fas fa-envelope"></i> Email : {mydata.useremail}</b>
    <b> District : {mydata.district}</b>
    <b> State : {mydata.state} ('{"INDIA"}')</b>
    </div>
    <ToastContainer />
    </>
  )
}

export default UserProfile