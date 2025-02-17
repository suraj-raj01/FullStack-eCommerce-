import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
const Crousel = () => {
  return (
    <>
        <div id="crousel">
        <Carousel fade>
          
          <Carousel.Item id='carousel-img'>
            <img
              src="https://media.product.which.co.uk/prod/images/ar_2to1_1500x750/22a475e555d7-best-laptop-deals.jpg"
              alt=""
              width="100%"
              height="450px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item id='carousel-img'>
            <img
              src="https://www.top10mobileshop.com/images/top10mobiles.com/slider/270514103202408151136.jpg"
              alt=""
              width="100%"
              height="450px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}>Reno 12 Pro 5G</h3>
              <p style={{ color: "black" }}>Your every day AI companion</p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
        
          
          <Carousel.Item id='carousel-img'>
            <img
              src="https://www.top10mobileshop.com/images/top10mobiles.com/slider/747523986202408151132.jpg"
              alt=""
              width="100%"
              height="450px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}>Vivo V40 | Vivo V40 Pro</h3>
              <p style={{ color: "black" }}>ZEISS Portrait SO Pro</p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* keyboards */}
          <Carousel.Item id='carousel-img'>
            <img
              src="https://m.media-amazon.com/images/I/61OzRc5FK1L.jpg"
              alt=""
              width="100%"
              height="450px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item id='carousel-img'>
            <img
              src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.slideshow-xlarge_2x.jpg"
              alt=""
              width="100%"
              height="450px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  )
}

export default Crousel