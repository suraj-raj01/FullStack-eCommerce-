import React, { useEffect, useState } from 'react'
import BASE_URL from '../Config'
import axios from 'axios'
import Table from "react-bootstrap/Table"
import { useNavigate } from 'react-router-dom'

const Purchases = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const[mydata,setMydata] = useState([]);

  const loadData=async()=>{
    let api = `${BASE_URL}/user/purchaseditems`;
    try {
      const response = await axios.post(api,{userid:userid});
      setMydata(response.data);
    } catch (error) {
      alert(error.response.data.msg);
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
        <tr>
          <td>
            <img src={key.defaultImg} alt="" height='80px' width='100px'/>
          </td>
          <td style={{textAlign:'start'}}>{key.productname}</td>
          <td style={{width:'130px',textAlign:'start'}}>{key.amount}{".00 ₹"}</td>
          <td style={{width:'130px'}}>{date1[0]}</td>
          <td className='text-start'>{key.useremail}</td>
          <td className='text-start'>{key.shippingaddress}</td>
        </tr>
      </>
    )
  })


  return (
    <>
    <br />
    <Table responsive striped hover bordered>
        <thead>
           <tr class='customer-record'>
            <th>Images</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Order Date</th>
            <th>Customer Email</th>
            <th>Shipping Address</th>
           </tr>
        </thead>
        <tbody>
            {ans}
        </tbody>
    </Table>
    </>
  )
}

export default Purchases