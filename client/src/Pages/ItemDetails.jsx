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
  const [relatedData, setrelatedData] = useState([]);
  const [status,setStatus] = useState(false);

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

  const showRelatedProduct = async () => {
    const name = mydata.category
    const api = `${BASE_URL}/product/showrelatedproduct`;
    try {
      const response = await axios.post(api, {name:name});
      setrelatedData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showRelatedProduct();
  }, [mydata.category]);

  const shopnow=(id)=>{
    navigate(`/shopnow/${id}`)
  }


  const ans = relatedData.map((key)=>{
    return(
      <>
        <div id="box" style={{boxShadow:'0 0 1px gray'}}>
          <div id="images">
            <img
              src={`${BASE_URL}/${key.defaultImage}`}
              alt=""
              width="300px"
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
                      height="30px"
                    />
                    <img
                      src={`${BASE_URL}/${key1[2]}`}
                      alt="!error"
                      height="30px"
                    />
                    <img
                      src={`${BASE_URL}/${key1[3]}`}
                      alt="!error"
                      height="30px"
                    />
                    <img
                      src={`${BASE_URL}/${key1[4]}`}
                      alt="!error"
                      height="30px"
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
                  dispatch(
                    addCartData({
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
              <Button size="sm" variant="success" onClick={()=>{shopnow(key._id)}}>
              <i class="fas fa-bag-shopping"></i> Shop Now
              </Button>
              <Button
                size="sm"
                variant="success"
               >
               <i class="fas fa-circle-info"></i> See Details
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  })

  const showRelated=()=>{
    setStatus(true);
  }
  const hideRelated=()=>{
    setStatus(false);
  }

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
            <Button size="sm" variant="success" onClick={()=>{shopnow(id)}}>
              <i class="fas fa-bag-shopping"></i> Shop Now
            </Button>
            {/* <Button size="sm" variant="success" onClick={()=>{seeDetails(mydata._id)}}>See Details</Button> */}
          </div>
        </div>
      </div>
      <br />
      <hr />
      
      <hr />
      <div id="hero">
        <div id="filter" style={{border:'none'}}></div>
        <div id="filterdata">
        <div id="cards">
          {
            status?(
              ans
            ):(
              ""
            )
          }
        </div>
        <h3 align="center">
        {status===true?(
          
          <Button variant="danger" onClick={hideRelated} className="mt-5 mb-5"><i class="fas fa-minus"></i> Less Related Products</Button>
        ):(
          <Button variant="success" onClick={showRelated}><i class="far fa-circle-down"></i> Load Related Products</Button>
        )}
      </h3>
        </div>
        
      </div>
      
    </>
  );
};

export default ItemDetails;
