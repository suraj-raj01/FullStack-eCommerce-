import React from 'react'
import Button from "react-bootstrap/Button"
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  const logout=()=>{
    navigate("/home")
  }
  const home=()=>{
    navigate("/home")
  }
  return (
    <>
        <div id="header">
            <div id="box">
                <h3>Admin Dashboard</h3>
            </div>
            <div id="box">
            <Button size="sm" variant="danger" onClick={home}><i class="fas fa-house"></i> Home</Button>
            <Button size="sm" variant="danger" onClick={logout}><i class="fas fa-arrow-right-from-bracket"></i> Logout</Button>
            {/* <i class="fas fa-circle-user"></i> */}
            </div>
        </div>
    </>
  )
}

export default Header