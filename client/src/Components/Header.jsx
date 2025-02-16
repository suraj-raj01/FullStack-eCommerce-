import React from 'react'
import Button from "react-bootstrap/Button"
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  const logout=()=>{
    navigate("/home")
  }
  return (
    <>
        <div id="header">
            <div id="box">
                <h3>Admin Dashboard</h3>
            </div>
            <div id="box">
            <Button size="sm" variant="danger" onClick={logout}>Logout</Button>
            <i class="fas fa-circle-user"></i>
            </div>
        </div>
    </>
  )
}

export default Header