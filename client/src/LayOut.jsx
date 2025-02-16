import React from 'react'
import TopNav from './Components/TopNav'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <>
        <TopNav/>
        <div id="outlet">
            <Outlet/>
        </div>
        <Footer/>
    </>
  )
}

export default LayOut