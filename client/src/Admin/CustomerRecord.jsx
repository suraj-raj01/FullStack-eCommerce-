import React, { useEffect, useState } from 'react'
import BASE_URL from '../Config';
import axios from 'axios';
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/esm/Button';

const CustomerRecord = () => {

  const[mydata,setMyData] = useState([]);

  const loadData = async() =>{
    let api = `${BASE_URL}/user/customerrecords`;
    try {
        const response = await axios.get(api);
        setMyData(response.data);
    } catch (error) {
        alert(error.response.data);
    }
  }

  useEffect(()=>{
    loadData();
  },[])

  const ans = mydata.map((key)=>{
    let date="";
    date = key.date;
    let date1 = date.split("T")
    return(
        <>
            <tr id='customer-records'>
                <td style={{width:'200px'}}>{key.productname}</td>
                <td style={{width:'80px'}}>{key.amount}{".00 ₹"}</td>
                <td style={{width:'130px'}}>{key.name}</td>
                <td>{key.useremail}</td>
                <td style={{width:'160px'}}>{key.shippingaddress}</td>
                <td style={{width:'110px'}}>{date1[0]}</td>
                <td>
                  <img src={key.defaultImg} alt="" height='80px' width='90px'/>
                </td>
            </tr>
        </>
    )
  })

  return (
    <>
    {/* <div id="search">
        <h3>Search Information</h3>
        <input type="text" placeholder='search ....' />
    </div> */}
    <Table responsive striped hover bordered>
        <thead>
           <tr class='customer-record'>
            <th>Product Name</th>
            <th>Price</th>
            <th>Customer</th>
            <th>Customer Email</th>
            <th>Address</th>
            <th>Date</th>
            <th>Product Image</th>
           </tr>
        </thead>
        <tbody>
            {ans}
        </tbody>
    </Table>
    </>
  )
}

export default CustomerRecord