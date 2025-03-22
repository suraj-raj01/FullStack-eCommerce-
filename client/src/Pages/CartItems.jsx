import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { itemInc, itemDec, itemDel } from "../redux/cartSlice";
import Button from "react-bootstrap/Button"
import BASE_URL from "../Config";
import { message } from "antd";
const CartItems = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const Data = useSelector((state) => state.addtoCart.cart);

  useEffect(()=>{
    if (!localStorage.getItem("username"))
    {
      message.error("Please Login!!")
      navigate("/login");
    }
  },[])

  const seeDetails = (id) =>{
    navigate(`/itemdetails/${id}`)
  }

  let totalPrime=0;
  const ans = Data.map((key) => {
    totalPrime+=Number(key.price*key.qnty);
    return (
      <>
        <tr>
          <td style={{cursor:'pointer'}}>
            <img
              src={`${BASE_URL}/${key.defaultImage}`}
              alt=""
              height="120px"
              onClick={()=>{seeDetails(key.id)}}
            />
          </td>
          <td className="text-start">{key.name}</td>
          <td className="text-start">{key.description}</td>
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
          <td style={{width:'120px'}}>
            <Button size="sm" variant="danger" onClick={() => {dispatch(itemDel({id:key.id}))}}>
            <i
              style={{color:'white'}}
              class="fas fa-trash"
              
            ></i> Remove</Button>
            
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
        <h2 className='text-center p-2'>Your Cart <i class="fas fa-cart-shopping" style={{fontSize:'24px'}}></i> Items</h2>
      <Table className="mt-2" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Images</th>
            <th>Product Name</th>
            <th>Description</th>
            <th className="text-center">Price</th>
            <th>Quantity</th>
            <th className="text-center">Remove</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>
    <div id="checkout-btn">
    <h3>Total Price : {totalPrime}{".00 ₹"}</h3>
    <Button variant="success" size="sm" onClick={()=>{navigate("/checkout")}}>
      <i class="fas fa-money-check-dollar"></i>  CHECKOUT BILL
       </Button>
    </div>
    </>
  );
};

export default CartItems;
