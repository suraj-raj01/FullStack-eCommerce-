import React from 'react'
import "../Style/productCategory.css"
const ProductCategory = () => {
    const img1="https://img.freepik.com/premium-photo/luxury-classic-analog-men-s-wrist-golden-silver-watches-white-background-3d-rendering_476612-5735.jpg";
    const img2="https://www.dell.com/wp-uploads/2024/01/XPS-9640-laptops-back-to-back-1280x800-1-640x400.jpg";
    const img3="https://media.istockphoto.com/id/173863591/photo/isolated-silver-computer-mouse-on-white-background.jpg?s=612x612&w=0&k=20&c=7z2TP7xjRih7220abTSccZzKS0nnCRD131wZ6Icr_fI=";
    const img4="https://m.media-amazon.com/images/I/61OzRc5FK1L.jpg";
    const img5="https://media.istockphoto.com/id/2135726791/vector/smart-tv-led-screen-mockup-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=RUFm2nrGT7LY8JT5JJsytXl1739_knnj8MJGMYaO7ts=";
    const img6="https://t4.ftcdn.net/jpg/05/36/92/41/360_F_536924102_TV4FGmLDAVB1jkOqcw88B7dgX6aRqt7X.jpg";
    const imgs = [img1,img2,img3,img4,img5,img6];
    const ans = imgs.map((key)=>{
        return(
            <>
            <div id="box">
                <img src={key} alt="" />
                
            </div>
            </>
        )
    })
  return (
    <>
        <div id="main">
            {ans}
            {/* <div id="box"></div>
            <div id="box"></div>
            <div id="box"></div>
            <div id="box"></div>
            <div id="box"></div>
            <div id="box"></div> */}
        </div>
    </>
  )
}

export default ProductCategory