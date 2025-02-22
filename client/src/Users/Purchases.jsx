import React, { useEffect, useState } from 'react'
import BASE_URL from '../Config'
import axios from 'axios'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/esm/Button'

const Purchases = () => {
  const userid = localStorage.getItem("userid");
  const[mydata,setMydata] = useState([]);

  const loadData=async()=>{
    let api = `${BASE_URL}/user/purchaseditems`;
    console.log(userid)
    try {
      const response = await axios.post(api,{userid:userid});
      setMydata(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  useEffect(()=>{
    loadData();
  },[])

  const recieve=async(id)=>{
    let api = `${BASE_URL}/user/itemreceived`;
    try {
      const response = await axios.post(api,{id:id})
      alert(response.data);
      loadData();
    } catch (error) {
      console.log(error);
    }
  }

  const ans = mydata.map((key)=>{
    let date="";
    date = key.date;
    let date1 = date.split("T")
    return(
      <>
        <tr>
          
          <td style={{textAlign:'start'}}>{key.productname}</td>
          <td style={{width:'130px',textAlign:'start'}}>{key.amount}{".00 ₹"}</td>
          <td style={{width:'130px'}}>{date1[0]}</td>
          <td>{key.useremail}</td>
          <td style={{width:'120px'}}>
            {key.status!="normal"?(
               <Button onClick={()=>{recieve(key._id)}} size='sm'>Recieve</Button>
            ):(<Button size='sm' disabled>Received</Button>)}
          </td>
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
            <th>Product Name</th>
            <th>Price</th>
            <th>Order Date</th>
            <th>Customer Email</th>
            <th style={{width:'140px'}}>Delivery Status</th>
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