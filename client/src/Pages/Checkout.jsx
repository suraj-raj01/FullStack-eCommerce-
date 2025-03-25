import React, { useEffect, useState } from "react";
import "../Style/checkout.css";
import BASE_URL from "../Config";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { itemInc, itemDec, itemDel } from "../redux/cartSlice";
import Button from "react-bootstrap/Button"

const Checkout = () => {
  const myid = localStorage.getItem("userid");
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const Data = useSelector((state) => state.addtoCart.cart);
  const [mydata, setMyData] = useState({});

  useEffect(()=>{
      if (!localStorage.getItem("username"))
      {
        navigate("/home");
        alert("Please Login First!!")
      }
    },[])

  const loadData = async () => {
    let api = `${BASE_URL}/user/userprofileshow`;
    try {
      const response = await axios.post(api, { id: myid });
      setMyData(response.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const seeDetails = (id) =>{
    navigate(`/itemdetails/${id}`)
  }

  let totalAmount=0;
  let myProImg="";
  let myProList="";
  const ans = Data.map((key) => {
    totalAmount+=Number(key.price*key.qnty);
    myProImg = `${BASE_URL}/${key.defaultImage}`
    myProList+=key.name+", "
    return (
      <>
        <tr>
          <td>
            <img
              src={`${BASE_URL}/${key.defaultImage}`}
              alt=""
              height="100px"
              onClick={()=>{seeDetails(key.id)}}
            />
          </td>
          <td>{key.name}</td>
          <td>{key.description}</td>
          <td style={{width:'120px'}}>{key.price * key.qnty}{".00 ₹"}</td>
          <td>
            <div style={{ display: "flex",alignItems:'center',justifyContent:'center', gap: "10px" }}>
              <i
                class="fas fa-circle-plus"
                onClick={() => {dispatch(itemInc({id:key.id}))}}
              ></i>
              <b>{key.qnty}</b>
              <i
                class="fas fa-circle-minus"
                onClick={()=>{dispatch(itemDec({id:key.id}))}}
              ></i>
            </div>
          </td>
          <td>
            <i
              class="fas fa-trash"
              onClick={() => {dispatch(itemDel({id:key.id}))}}
            ></i>
          </td>
        </tr>
      </>
    );
  });

  const data1 = {
    name:mydata.name,
    mobile:mydata.mobileno,
    email:mydata.useremail,
    defaultImg:myProImg,
    shippingaddress:mydata.shippingaddress,
    productname:myProList,
    userid:myid
  }

  const initPay = (data) => {
    const options = {
      key : "rzp_test_beWpubWRnZoYkT",
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: "Test",
      image:myProImg,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = `${BASE_URL}/api/payment/verify`;
          const {data} = await axios.post(verifyURL,response);
        } catch(error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = `${BASE_URL}/api/payment/orders`;
      const {data} = await axios.post(orderURL,{amount:totalAmount,...data1});
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="checkout">
        <div id="user-details">
          <p className="text-end"><i class="fas fa-location-crosshairs"></i> Use current location</p>
          <h3>Shipping Address</h3>
          <b><i class="fas fa-user"></i> NAME : {mydata.name}</b>
          <b><i class="fas fa-mobile-screen-button"></i> MOBILE NO : {mydata.mobileno}</b>
          <b><i class="fas fa-envelope"></i> EAMIL : {mydata.useremail}</b>
          <b><i class="fas fa-location-dot"></i> SHIPPING ADDRESS : {mydata.shippingaddress}</b>
          <b><i class="fas fa-building-columns"></i> APARTMENT : {mydata.apartment}</b>
          <b>DISTRICT : {mydata.district}</b>
          <b>PIN CODE : {mydata.pincode}</b>
          <b>STATE : {mydata.state} ('{"INDIA"}')</b>
        </div>

        <div id="purchase-items">
        <h3 className='text-start '>Your Purchase <i class="fas fa-cart-shopping"></i> Items</h3>
      <Table className="mt-2" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Images</th>
            <th>Product Name</th>
            <th>Description</th>
            <th className="text-center">Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>
    <div id="checkout-btn">
    <h3>Total Price : {totalAmount}{".00 ₹"}</h3>
    <Button variant="success" size="sm" type="submit" onClick={handlePay}>
      <i class="fas fa-money-check-dollar"></i>  PAYMENTS
       </Button>
    </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
