import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { itemInc, itemDec, itemDel } from "../redux/cartSlice";
import BASE_URL from "../Config";
const CartItems = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.addtoCart.cart);
  console.log(Data);


  const ans = Data.map((key) => {
    return (
      <>
        <tr>
          <td>
            <img
              src={`${BASE_URL}/${key.defaultImage}`}
              alt=""
              height="120px"
            />
          </td>
          <td>{key.name}</td>
          <td>{key.description}</td>
          <td>{key.price * key.qnty}</td>
          <td>{key.qnty}</td>
          <td>
            <div style={{ display: "flex", gap: "10px" }}>
              <i
                class="fas fa-circle-plus"
                onClick={() => {dispatch(itemInc({id:key.id}))}}
              ></i>
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

  return (
    <>
      <Table className="mt-2" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Images</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Items</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>
    </>
  );
};

export default CartItems;
