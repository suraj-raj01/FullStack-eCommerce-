import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import BASE_URL from "../Config";
import axios from "axios";
const SearchCustomer = () => {
  const [email, setEmail] = useState("");
  const [mydata, setMydata] = useState([]);

  const mySearch = async (e) => {
    let stdname = e.target.value;
    setEmail(stdname);
    let api = `${BASE_URL}/admin/searchcustomer`;
    try {
      const response = await axios.post(api, { email: email });
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ans = mydata.map((key) => {
    let date="";
    date = key.date;
    let date1 = date.split("T")
    return (
      <>
        <tr id="search-cust">
          <td style={{ width: "200px" }}>{key.productname}</td>
          <td style={{ width: "80px" }}>
            {key.amount}
            {".00 ₹"}
          </td>
          <td style={{ width: "130px" }}>{key.name.toUpperCase()}</td>
          <td>{key.useremail}</td>
          <td style={{ width: "300px" }}>{key.shippingaddress}</td>
          <td style={{ width: "110px" }}>{date1[0]}</td>
          <td>
            <img src={key.defaultImg} alt="" height="80px" width="90px" />
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <div id="search">
        <h3>Search Customers</h3>
        <input
          type="text"
          placeholder="enter customer email ...."
          value={email}
          onChange={mySearch}
        />
      </div>
      <Table responsive striped hover bordered>
        <thead>
          <tr>
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
  );
};

export default SearchCustomer;
