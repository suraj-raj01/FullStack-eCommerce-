import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Categories from "../Components/Categories";
import PrimaryProduct from "./PrimaryProduct";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Home = () => {
  return (
    <>
     <div id="crousel">
        <Carousel fade>
          <Carousel.Item>
            <img
              src="https://www.top10mobileshop.com/images/top10mobiles.com/slider/794559998202404261240.jpg "
              alt=""
              width="100%"
              height="400px"
            />
            <Carousel.Caption>
              <h3>V30 | Vivo 30 Pro</h3>
              <p>Delight every Moments</p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://media.product.which.co.uk/prod/images/ar_2to1_1500x750/22a475e555d7-best-laptop-deals.jpg"
              alt=""
              width="100%"
              height="400px"
            />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://www.top10mobileshop.com/images/top10mobiles.com/slider/270514103202408151136.jpg"
              alt=""
              width="100%"
              height="400px"
            />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}>Reno 12 Pro 5G</h3>
              <p style={{ color: "black" }}>Your every day AI companion</p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
        
          
          <Carousel.Item>
            <img
              src="https://www.top10mobileshop.com/images/top10mobiles.com/slider/747523986202408151132.jpg"
              alt=""
              width="100%"
              height="400px"
            />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}>Vivo V40 | Vivo V40 Pro</h3>
              <p style={{ color: "black" }}>ZEISS Portrait SO Pro</p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* keyboards */}
          <Carousel.Item>
            <img
              src="https://m.media-amazon.com/images/I/61OzRc5FK1L.jpg"
              alt=""
              width="100%"
              height="400px"
            />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.slideshow-xlarge_2x.jpg"
              alt=""
              width="100%"
              height="400px"
            />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <br />
      <Categories/>
      <hr />
      <div id="hero">
        <div id="filter">
        <InputGroup className="mb-3" >
        <Form.Control
          placeholder="enter product name"
          aria-describedby="basic-addon2"
        />
        <Button variant="success">
          Button
        </Button>
      </InputGroup>
        </div>
        <div id="filterdata">
        <PrimaryProduct/>
        </div>
      </div>
    </>
  );
};

export default Home;
