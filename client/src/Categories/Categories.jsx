import React from 'react'
import { useNavigate } from 'react-router-dom'
const Categories = () => {
  const navigate = useNavigate();

  const laptops=()=>{
    navigate("/home/laptops")
  }
  const mobiles=()=>{
    navigate("/home/mobiles")
  }
  const Tv=()=>{
    navigate("/home/tv")
  }
  const keyboard=()=>{
    navigate("/home/keyboard")
  }
  const mouse=()=>{
    navigate("/home/mouse")
  }
  const watch=()=>{
    navigate("/home/watches")
  }
  return (
    <>
        <div id="categories">
            <div id="box" onClick={laptops}><i class="fas fa-laptop" ></i> Laptops</div>
            <div id="box" onClick={mobiles}><i class="fas fa-mobile-screen-button"></i> Mobiles</div>
            <div id="box" onClick={Tv}><i class="fas fa-desktop"></i> TV</div>
            <div id="box" onClick={keyboard}><i class="far fa-keyboard"></i> Keyboards</div>
            <div id="box" onClick={mouse}><i class="fas fa-computer-mouse"></i> Mouse</div>
            <div id="box" onClick={watch}><i class="fas fa-clock"></i> Watch</div>
            <div id="box" onClick={laptops}>Categories</div>
            <div id="box" onClick={laptops}>Categories</div>
            <div id="box" onClick={laptops}>Categories</div>
        </div>
    </>
  )
}

export default Categories