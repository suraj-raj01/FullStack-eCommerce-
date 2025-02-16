import React, { useEffect, useState } from "react";
import BASE_URL from "../Config";
import axios from "axios";
import Button from "react-bootstrap/Button"
import { Flex, Rate } from 'antd';
import { useDispatch } from "react-redux";
import {addCartData} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const PrimaryProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(3);
  const [mydata, setMydata] = useState([]);
  const loadData = async () => {
    const api = `${BASE_URL}/admin/displayprimarydata`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const seeDetails=(id)=>{
    navigate(`/itemdetails/${id}`)
  }

  const res = mydata.map((key) => {
    return (
      <>
        <div id="box">
          <div id="images">
            <img
              src={`${BASE_URL}/${key.defaultImage}`}
              alt=""
              height="250px"
            />
            <div id="img-option">
            {
            key.images.map((key1)=>{
              return(
                <>
                    <img src={`${BASE_URL}/${key1[2]}`} alt="" height='70px' />
                    {
                      
                    }
                </>
              )
            })}
            </div>
          </div>
          
          <div id="contents">
            <b id="pro-name">{key.name}</b>
            <b id="description">{key.description}</b>
            <b>Brand : {key.brand}</b>
            {/* <b>Category : {key.category}</b> */}
            {/* <b>Subcategory : {key.subcategory}</b> */}
            <b id="price">Price : {key.price} {".00 ₹"}</b>
            {/* <b>Status : {key.status}</b> */}
            <b>Ratings : {key.ratings} 
              <h2></h2>
              <Flex gap="middle" vertical>
              <Rate tooltips={desc} onChange={setValue} value={key.ratings} />
              </Flex></b>
            <div id="btns">
              <Button size="sm" variant="success" onClick={()=>
                {dispatch
                  (addCartData({
                  id:key._id,
                  name:key.name,
                  brand:key.brand,
                  price:key.price,
                  description:key.description,
                  category:key.category,
                  subcategory:key.subcategory,
                  images:key.images,
                  defaultImage:key.defaultImage,
                  ratings:key.ratings,
                  status:key.status,
                  qnty:1
                  })
                )}}> <i class="fas fa-plus"/> AddtoCart</Button>
              <Button size="sm" variant="danger"><i class="fas fa-heart"></i> Likes</Button>
              <Button size="sm" variant="success">Shop Now</Button>
              <Button size="sm" variant="success" onClick={()=>{seeDetails(key._id)}}>See Details</Button>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div id="cards">
        {res}
        {/* <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"> images </div>
              <div id="contents">Contents</div>
            </div>
            <div id="box">
              <div id="images"></div>
              <div id="contents"></div>
            </div>
            <div id="box">
              <div id="images"></div>
              <div id="contents"></div>
            </div>
            <div id="box">
              <div id="images"></div>
              <div id="contents"></div>
            </div> */}
      </div>
    </>
  );
};

export default PrimaryProduct;
