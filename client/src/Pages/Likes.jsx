import React from 'react'
import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector } from "react-redux";
import {itemDislike } from "../redux/cartSlice";
import Button from "react-bootstrap/Button"
import BASE_URL from "../Config";
const Likes = () => {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const Data = useSelector((state) => state.addtoLike.likes);
  
  const seeDetails=(id)=>{
    navigate(`/itemdetails/${id}`)
  }
  
  let totalPrime=0;
  const ans = Data.map((key) => {
    totalPrime+=Number(key.price*key.qnty);
    return (
      <>
        <tr>
          <td>
            <img
              src={`${BASE_URL}/${key.defaultImage}`}
              alt=""
              height="120px"
              onClick={()=>{seeDetails(key.id)}}
            />
          </td>
          <td>{key.name}</td>
          <td>{key.description}</td>
          <td style={{width:'120px'}}>{key.price * key.qnty}{".00 ₹"}</td>
          <td style={{width:'120px'}}>
            <Button size='sm' variant='success' onClick={() => {dispatch(itemDislike({id:key.id}))}}>
            <i style={{color:'white'}} class="fas fa-thumbs-down"></i>  Dislike</Button>
          </td>
        </tr>
      </>
    );
  });



  return (
    <>
    <h2 className='text-center p-2'>Your Like <i class="fab fa-gratipay" style={{color:'red',fontSize:'26px'}}></i> Items</h2>
    <Table className="mt-2" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Images</th>
            <th>Product Name</th>
            <th>Description</th>
            <th className="text-center">Price</th>
            <th className="text-center">Remove</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>
    <div id="checkout-btn">
    <h3>Total Price : {totalPrime}{".00 ₹"}</h3>
    <Button variant="success" size="sm" onClick={()=>{naviage("/checkout")}}>
      <i class="fas fa-money-check-dollar"></i>  CHECKOUT BILL
       </Button>
    </div>
    </>
  )
}

export default Likes