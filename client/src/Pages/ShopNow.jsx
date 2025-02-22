import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../Config";
const ShopNow = () => {
  const { id } = useParams();
  const myid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [mydata, setMyData] = useState({});
  const [shopItem, setShopItem] = useState({});
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
      alert("Please Login First!!");
    }
  }, []);

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

  const shopNow = async () => {
    let api = `${BASE_URL}/admin/itemdetails`;
    try {
      const response = await axios.post(api, { id: id });
      setShopItem(response.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    shopNow();
  }, []);

    const totalAmount=Number(shopItem.price);
    const myProImg = `${BASE_URL}/${shopItem.defaultImage}`
    const myProList =shopItem.name+", "

  const seeDetails = (id) => {
    navigate(`/itemdetails/${id}`);
  };

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
      name: myProList,
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
    if(Number(shopItem.price)>100000){
        alert("You can't Shopping more than 100000.00 ₹")
        return;
    }else{
    try {
      const orderURL = `${BASE_URL}/api/payment/orders`;
      const {data} = await axios.post(orderURL,{amount: totalAmount,...data1});
      console.log(data);
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
    }
  };

  return (
    <>
      <div id="checkout">
        <div id="user-details">
          <p className="text-end">
            <i class="fas fa-location-crosshairs"></i> Use current location
          </p>
          <h3>Shipping Address</h3>
          <b>
            <i class="fas fa-user"></i> NAME : {mydata.name}
          </b>
          <b>
            <i class="fas fa-mobile-screen-button"></i> MOBILE NO :{" "}
            {mydata.mobileno}
          </b>
          <b>
            <i class="fas fa-envelope"></i> EAMIL : {mydata.useremail}
          </b>
          <b>
            <i class="fas fa-location-dot"></i> SHIPPING ADDRESS :{" "}
            {mydata.shippingaddress}
          </b>
          <b>
            <i class="fas fa-building-columns"></i> APARTMENT :{" "}
            {mydata.apartment}
          </b>
          <b>DISTRICT : {mydata.district}</b>
          <b>PIN CODE : {mydata.pincode}</b>
          <b>
            STATE : {mydata.state} ('{"INDIA"}')
          </b>
        </div>

        <div id="purchase-items">
          <h3 className="text-start ">
            Your Selected <i class="fas fa-circle-check" style={{color:'green'}}></i> Items
          </h3>
          <Table className="mt-2" striped bordered hover responsive>
            <thead>
              <tr>
                <th>Images</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={`${BASE_URL}/${shopItem.defaultImage}`}
                    alt=""
                    height="130px"
                    width='150px'
                    onClick={() => {
                      seeDetails(shopItem._id);
                    }}
                  />
                </td>
                <td style={{ width: "180px" }}>{shopItem.name}</td>
                <td style={{ width: "350px",textAlign:'start' }}>{shopItem.description}</td>
                <td style={{ width: "150px" }}>
                  {shopItem.price}
                  {".00 ₹"}
                </td>
              </tr>
            </tbody>
          </Table>
          <div id="checkout-btn">
            <h3>
              Total Price : {shopItem.price}
              {".00 ₹"}
            </h3>
            <Button
              variant="success"
              size="sm"
              type="submit"
              onClick={handlePay}
            >
              <i class="fas fa-money-check-dollar"></i> PAYMENTS
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopNow;
