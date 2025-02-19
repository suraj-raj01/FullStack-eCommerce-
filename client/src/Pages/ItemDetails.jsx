import React, { useEffect, useState } from "react";
import BASE_URL from "../Config";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Flex, Rate } from "antd";
import { useDispatch } from "react-redux";
import { addCartData, addLikeData } from "../redux/cartSlice";
import { Rating } from "primereact/rating";
import { useNavigate } from "react-router-dom";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
import axios from "axios";
import "../Style/details.css";

const ItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(3);
  const [mydata, setMydata] = useState({});
  const [Images, setImages] = useState([]);

  const loadData = async () => {
    const api = `${BASE_URL}/admin/itemdetails`;
    try {
      const response = await axios.post(api, { id: id });
      setMydata(response.data);
      setImages(response.data.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div id="item-details">
        <div id="images">
          <img
            src={`${BASE_URL}/${mydata.defaultImage}`}
            alt=""
            height="400px"
          />
          <div id="img-option">
            {Images.map((key) => {
              return (
                <>
                  <img
                    src={`${BASE_URL}/${key[0]}`}
                    alt="!error"
                    height="40px"
                  />
                  <img
                    src={`${BASE_URL}/${key[1]}`}
                    alt="!error"
                    height="40px"
                  />
                  <img
                    src={`${BASE_URL}/${key[2]}`}
                    alt="!error"
                    height="40px"
                  />
                  <img
                    src={`${BASE_URL}/${key[3]}`}
                    alt="!error"
                    height="40px"
                  />
                </>
              );
            })}
          </div>
        </div>

        <div id="contents">
          <b id="pro-name">{mydata.name}</b>
          <b id="description">{mydata.description}</b>
          <b>Brand : {mydata.brand}</b>
          {/* <b>Category : {mydata.category}</b> */}
          {/* <b>Subcategory : {mydata.subcategory}</b> */}
          <b id="price">
            Price : {mydata.price} {".00 ₹"}
          </b>
          {/* <b>Status : {mydata.status}</b> */}
          <b>
            Ratings : {mydata.ratings}
            <h2></h2>
            <Flex gap="middle" vertical>
              <Rate
                tooltips={desc}
                onChange={setValue}
                value={mydata.ratings}
              />
            </Flex>
          </b>
          <div id="btns">
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                dispatch(
                  addCartData({
                    id: mydata._id,
                    name: mydata.name,
                    brand: mydata.brand,
                    price: mydata.price,
                    description: mydata.description,
                    category: mydata.category,
                    subcategory: mydata.subcategory,
                    images: mydata.images,
                    defaultImage: mydata.defaultImage,
                    ratings: mydata.ratings,
                    status: mydata.status,
                    qnty: 1,
                  })
                );
              }}
            >
              {" "}
              <i class="fas fa-plus" /> AddtoCart
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                dispatch(
                  addLikeData({
                    id: mydata._id,
                    name: mydata.name,
                    brand: mydata.brand,
                    price: mydata.price,
                    description: mydata.description,
                    category: mydata.category,
                    subcategory: mydata.subcategory,
                    images: mydata.images,
                    defaultImage: mydata.defaultImage,
                    ratings: mydata.ratings,
                    status: mydata.status,
                    qnty: 1,
                  })
                );
              }}
            >
              <i class="fas fa-heart"></i> Likes
            </Button>
            <Button size="sm" variant="success">
              Shop Now
            </Button>
            {/* <Button size="sm" variant="success" onClick={()=>{seeDetails(mydata._id)}}>See Details</Button> */}
          </div>
        </div>
      </div>
      <br />
      <hr />
      <h3 align="center">Related Products !!</h3>
      <hr />
    </>
  );
};

export default ItemDetails;
