import React, { useEffect, useState } from 'react'
import BASE_URL from '../Config';
import axios from 'axios';
import Button from "react-bootstrap/Button"
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
const Update = () => {
  const navigate = useNavigate();
  const[mydata,setMydata] = useState([]);

  const loadData=async()=>{
    const api = `${BASE_URL}/admin/displaydata`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    loadData();
  },[]);

  const res = mydata.map((key)=>{
    return(
      <>

      <div id='dashboard-items'>

       <div id='dashboard-image'>
        <img src={`${BASE_URL}/${key.defaultImage}`} alt="" width='100%'/>
        </div>

       <div id='dashboard-data'>
       <b>Product Name : {key.name}</b>
        <b>Brand Name : {key.brand}</b>
        <b>Category : {key.category}</b>
        <b>Subcategory : {key.subcategory}</b>
        <b>Description : {key.description}</b>
        <b>Price : {key.price}</b>
        <b>Status : {key.status}</b>
        <b>Rating : {key.ratings}</b>
        <div id='dashboard-btns'>
          <Button size='sm' variant='info' onClick={()=>{editData(key._id)}}><i class="fas fa-pen-to-square"></i> Edit Data</Button>
          <Button size='sm' variant='danger' onClick={()=>{deleteData(key._id)}}><i class="fas fa-trash"></i> Delete</Button>
          {key.status=="normal"?(
            <>
            <Button size='sm' variant='warning' onClick={()=>{makePrimary(key._id)}}>Make Primary</Button>
            </>
          ):(
            <>
            <Button size='sm' variant='success' onClick={()=>{makeNormal(key._id)}}>Make Normal</Button>
            </>
          )}
        </div>
        </div>
       </div>
      </>
    )
  })

  const editData = (id) =>{
      navigate(`/admindashboard/editproductdata/${id}`);
  }

  const deleteData = async(id) =>{
    const api = `${BASE_URL}/admin/deleteproductdata`;
    try {
      const response = await axios.post(api,{id:id});
      message.success(response.data.msg);
    } catch (error) {
      console.log(error);
    }
    loadData();
  }

  const makePrimary = async(id) =>{
    const api = `${BASE_URL}/admin/makeproductprimary`;
    try {
      const response = await axios.post(api,{id:id});
      message.success(response.data.msg);
    } catch (error) {
      console.log(error);
    }
    loadData();
  }

  const makeNormal = async(id) =>{
    const api = `${BASE_URL}/admin/makeproductnormal`;
    try {
      const response = await axios.post(api,{id:id});
      message.success(response.data.msg);
    } catch (error) {
      console.log(error);
    }
    loadData();
  }

  return (
    <>
      <div id='dashboard-display'>
      {res}
      </div>
    </>
  )
}

export default Update