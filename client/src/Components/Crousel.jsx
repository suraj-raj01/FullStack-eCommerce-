import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
const Crousel = () => {
  return (
    <>
        <div id="crousel">
        <Carousel fade>
          
          <Carousel.Item>
            <img
              src="https://www.bobswatches.com/rolex-blog/wp-content/uploads/2021/08/Screen-Shot-2021-08-11-at-10.26.09-AM.jpg"
              alt=""
              width="100%"
              height="500px"
            />
            <Carousel.Caption id='crousel-caption'>
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
              height="500px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}>Reno 12 Pro 5G</h3>
              <p style={{ color: "black" }}>Your every day AI companion</p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
        
          
          <Carousel.Item >
            <img
              src="https://www.top10mobileshop.com/images/top10mobiles.com/slider/747523986202408151132.jpg"
              alt=""
              width="100%"
              height="500px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}>Vivo V40 | Vivo V40 Pro</h3>
              <p style={{ color: "black" }}>ZEISS Portrait SO Pro</p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* keyboards */}
          <Carousel.Item >
            <img
              src="https://assets.superhivemarket.com/store/productimage/348204/image/1a4c4cef334b88ae9c30386e02ea96b6.jpg"
              alt=""
              width="100%"
              height="500px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item >
            <img
              src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.slideshow-xlarge_2x.jpg"
              alt=""
              width="100%"
              height="500px"
            />
            <Carousel.Caption id='crousel-caption'>
              <h3 style={{ color: "black" }}></h3>
              <p style={{ color: "black" }}></p>
              <Button variant="outline-primary">Info →</Button>
            </Carousel.Caption>
          </Carousel.Item>
          
          <Carousel.Item >
            <img
              src="https://cdn.shopify.com/s/files/1/0413/1202/6777/articles/how-to-choose-the-right-tv.jpg?v=1631690688"
              alt=""
              width="100%"
              height="500px"
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