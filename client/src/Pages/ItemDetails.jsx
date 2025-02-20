import React, { useEffect, useState } from "react";
import BASE_URL from "../Config";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addCartData, addLikeData } from "../redux/cartSlice";
import { Rating } from "primereact/rating";
import { useNavigate } from "react-router-dom";
const desc = ["terrible", "bad", "normal", "good", "wonderful", "Awesome"];
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
      console.log(response.data.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRate = async (id) => {
    let api = `${BASE_URL}/admin/updaterating`;
    try {
      const response = await axios.post(api, { id: id, value: value });
      setValue(response.data);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const [showimage, setShowImage] = useState(0);

  const showImg1 = (img1) => {
    let im = document.getElementById("orgImg");
    im.src = img1;
    setShowImage(1);
  };
  const showImg2 = (img2) => {
    let im = document.getElementById("orgImg");
    im.src = img2;
    setShowImage(2);
  };
  const showImg3 = (img3) => {
    let im = document.getElementById("orgImg");
    im.src = img3;
    setShowImage(2);
  };
  const showImg4 = (img4) => {
    let im = document.getElementById("orgImg");
    im.src = img4;
    setShowImage(3);
  };

  return (
    <>
      <div id="item-details">
        <div id="images">
          <img
            id="orgImg"
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
                    onMouseEnter={() => {
                      showImg1(`${BASE_URL}/${key[0]}`);
                    }}
                  />
                  <img
                    src={`${BASE_URL}/${key[1]}`}
                    alt="!error"
                    height="40px"
                    onMouseEnter={() => {
                      showImg2(`${BASE_URL}/${key[1]}`);
                    }}
                  />
                  <img
                    src={`${BASE_URL}/${key[2]}`}
                    alt="!error"
                    height="40px"
                    onMouseEnter={() => {
                      showImg3(`${BASE_URL}/${key[2]}`);
                    }}
                  />
                  <img
                    src={`${BASE_URL}/${key[3]}`}
                    alt="!error"
                    height="40px"
                    onMouseEnter={() => {
                      showImg4(`${BASE_URL}/${key[3]}`);
                    }}
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
          <b>
            Ratings : {mydata.ratings} {desc[mydata.ratings]}
          </b>
          <h2></h2>
          <div className=" flex justify-content-center">
            <Rating
              value={mydata.ratings}
              onChange={(e) => setValue(e.value)}
              onClick={() => {
                handleRate(mydata._id);
              }}
              cancel={false}
            />
          </div>

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
              <i class="fas fa-bag-shopping"></i> Shop Now
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
