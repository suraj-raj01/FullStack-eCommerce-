import React, { useEffect, useState } from "react";
import BASE_URL from "../Config";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addCartData, addLikeData } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";
const desc = ["terrible", "bad", "normal", "good", "wonderful", "Awesome"];

const PrimaryProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mydata, setMydata] = useState([]);
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState(0);

  const loadData = async () => {
    const api = `${BASE_URL}/admin/displayprimarydata`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    loadData();
  },[])

  useEffect(() => {
    setTimeout(() => {
      setStatus(false);
    }, 1000);
    setStatus(true);
  }, []);

  const seeDetails = (id) => {
    navigate(`/itemdetails/${id}`);
  };

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

  const addDataToCart = (id,name,brand,price,description,category,subcategory,images,defaultImage,ratings,status) =>{
    dispatch(
      addCartData({
        id: id,
        name: name,
        brand: brand,
        price: price,
        description: description,
        category: category,
        subcategory: subcategory,
        images: images,
        defaultImage:defaultImage,
        ratings: ratings,
        status: status,
        qnty: 1,
      })
    )
  }

  const shopnow=(id)=>{
    navigate(`/shopnow/${id}`)
  }

  const res = mydata.map((key) => {
    return (
      <>
        <div id="box">
          <div id="images">
            <img
              src={`${BASE_URL}/${key.defaultImage}`}
              alt=""
              width="85%"
              onClick={() => {
                seeDetails(key._id);
              }}
            />
            {/* <div id="img-option">
              {key.images.map((key1) => {
                return (
                  <>
                    <img
                      src={`${BASE_URL}/${key1[1]}`}
                      alt="!error"
                      height="40px"
                    />
                    <img
                      src={`${BASE_URL}/${key1[2]}`}
                      alt="!error"
                      height="40px"
                    />
                    <img
                      src={`${BASE_URL}/${key1[3]}`}
                      alt="!error"
                      height="40px"
                    />
                    <img
                      src={`${BASE_URL}/${key1[4]}`}
                      alt="!error"
                      height="40px"
                    />
                  </>
                );
              })}
            </div> */}
          </div>

          <div id="contents">
            <b id="pro-name">{key.name}</b>
            <b id="description">{key.description}</b>
            <b>Brand : {key.brand}</b>
            {/* <b>Category : {key.category}</b> */}
            {/* <b>Subcategory : {key.subcategory}</b> */}
            <b id="price">
              Price : {key.price} {".00 ₹"}
            </b>
            {/* <b>Status : {key.status}</b> */}
            <b>
              Ratings : {key.ratings} {desc[key.ratings]}
              </b>
              <h2></h2>
              <div className=" flex justify-content-center">
                <Rating
                  value={key.ratings}
                  onChange={(e) => setValue(e.value)}
                  onClick={() => {
                    handleRate(key._id);
                  }}
                  cancel={false}
                />
              </div>

            <div id="btns">
              <Button
                size="sm"
                variant="success"
                onClick={() => {
                    addDataToCart(
                      key._id,
                      key.name,
                      key.brand,
                      key.price,
                      key.description,
                      key.category,
                      key.subcategory,
                      key.images,
                      key.defaultImage,
                      key.ratings,
                      key.status,
                    )
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
                      id: key._id,
                      name: key.name,
                      brand: key.brand,
                      price: key.price,
                      description: key.description,
                      category: key.category,
                      subcategory: key.subcategory,
                      images: key.images,
                      defaultImage: key.defaultImage,
                      ratings: key.ratings,
                      status: key.status,
                      qnty: 1,
                    })
                  );
                }}
              >
                <i class="fas fa-heart"></i> Likes
              </Button>
              <Button size="sm" variant="success"  onClick={()=>{shopnow(key._id)}}>
              <i class="fas fa-bag-shopping"></i> Shop Now
              </Button>
              <Button
                size="sm"
                variant="success"
                onClick={() => {
                  seeDetails(key._id);
                }}
              >
               <i class="fas fa-circle-info"></i> See Details
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      {status ? (
        <center>
          <img
            src="https://i.imgur.com/mCYOIO1.gif"
            alt="loader"
            height="150px"
          />
        </center>
      ) : (
        <div id="cards">{res}</div>
      )}
    </>
  );
};

export default PrimaryProduct;
