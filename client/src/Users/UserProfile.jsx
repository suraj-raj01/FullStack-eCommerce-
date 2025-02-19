import React, { useEffect,useState } from "react";
import BASE_URL from "../Config";
import axios from "axios";
const UserProfile = () => {
  const myid = localStorage.getItem("userid");
  const [mydata,setMyData] = useState({});

  const loadData = async() =>{

    let api = `${BASE_URL}/user/userprofileshow`;
    try {
      const response = await axios.post(api,{id:myid});
      setMyData(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  useEffect(()=>{
    loadData();
  },[])
  return (
    <>
    Name : {mydata.name} <br />
    Mobile : {mydata.mobileno} <br />
    Email : {mydata.useremail} <br />
    District : {mydata.district} <br />
    State : {mydata.state}
    </>
  )
}

export default UserProfile