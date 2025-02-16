import React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/Home";
import LayOut from "./LayOut";
import About from "./Pages/About";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AdminDashboard from "./Admin/AdminDashboard";
import ProductInsert from "./Admin/ProductInsert";
import UserDashboard from "./Users/UserDashboard";
import UserProfile from "./Users/UserProfile";
import CartItems from "./Pages/CartItems";
import Update from "./Admin/Update";
import AdminProfile from "./Admin/AdminProfile";
import EditProductData from "./Admin/EditProductData";
import ItemDetails from "./Pages/ItemDetails";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut/>}>
            <Route index element={<Home/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="cartitems" element={<CartItems/>}/>
            <Route path="itemdetails/:id" element={<ItemDetails/>}/>
          </Route>
          <Route path="/admindashboard" element={<AdminDashboard/>}>
            <Route index element={<AdminProfile/>}/>
            <Route path="adminprofile" element={<AdminProfile/>}/>kf
            <Route path="insert" element={<ProductInsert/>}/>
            <Route path="update" element={<Update/>}/>
            <Route path="editproductdata/:id" element={<EditProductData/>}/>
          </Route>
          <Route path="/userdashboard" element={<UserDashboard/>}>
            <Route path="userprofile" element={<UserProfile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
