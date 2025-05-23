import React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/Home";
import LayOut from "./LayOut";
import About from "./Pages/About";
import Filter from "./Filter/Filter";
import Services from "./Pages/Services";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProfile from "./Admin/AdminProfile";
import ProductInsert from "./Admin/ProductInsert";
import Update from "./Admin/Update";
import PrimaryProduct from "./Pages/PrimaryProduct";
import CustomerRecord from "./Admin/CustomerRecord";
import SearchCustomer from "./Admin/SearchCustomer";
import UserDashboard from "./Users/UserDashboard";
import UserProfile from "./Users/UserProfile";
import Purchases from "./Users/Purchases";
import CartItems from "./Pages/CartItems";
import EditProductData from "./Admin/EditProductData";
import ItemDetails from "./Pages/ItemDetails";
import Laptops from "./Categories/Laptops";
import Mobiles from "./Categories/Mobiles";
import Tv from "./Categories/Tv";
import Keyboard from "./Categories/Keyboard";
import Mouse from "./Categories/Mouse";
import Likes from "./Pages/Likes";
import Checkout from "./Pages/Checkout";
import SmartWatches from "./Categories/SmartWatches";
import Watches from "./Categories/Watches";
import ShopNow from "./Pages/ShopNow";
import FilterByPrice from "./Filter/FilterByPrice";
import FilterByName from "./Filter/FilterByName";
import FilterByCategories from "./Filter/FilterByCategories";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut/>}>
            <Route index element={<Home/>}/>
            <Route path="home" element={<Home/>}>
              <Route index element={<PrimaryProduct/>}/>
              <Route path="primaryproduct" element={<PrimaryProduct/>}/>
              <Route path="laptops" element={<Laptops/>}/>
              <Route path="mobiles" element={<Mobiles/>}/>
              <Route path="tv" element={<Tv/>}/>
              <Route path="smartwatches" element={<SmartWatches/>}/>
              <Route path="watches" element={<Watches/>}/>
              <Route path="keyboard" element={<Keyboard/>}/>
              <Route path="mouse" element={<Mouse/>}/>
            </Route>
            <Route path="likes" element={<Likes/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="filter" element={<Filter/>}>
              <Route index element={<FilterByPrice/>}/>
              <Route path="filterbyprice" element={<FilterByPrice/>}/>
              <Route path="filterbyprice/:priceChange" element={<FilterByPrice/>}/>
              <Route path="filterbyname" element={<FilterByName/>}/>
              <Route path="filterbyname/:input" element={<FilterByName/>}/>
              <Route path="filterbycategory" element={<FilterByCategories/>}/>
              <Route path="filterbycategory/:category" element={<FilterByCategories/>}/>
            </Route>
            <Route path="services" element={<Services/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="cartitems" element={<CartItems/>}/>
            <Route path="itemdetails/:id" element={<ItemDetails/>}/>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="shopnow/:id" element={<ShopNow/>}/>
          </Route>
          <Route path="/admindashboard" element={<AdminDashboard/>}>
            <Route index element={<AdminProfile/>}/>
            <Route path="adminprofile" element={<AdminProfile/>}/>
            <Route path="insert" element={<ProductInsert/>}/>
            <Route path="update" element={<Update/>}/>
            <Route path="editproductdata/:id" element={<EditProductData/>}/>
            <Route path="customerrecord" element={<CustomerRecord/>}/>
            <Route path="searchcustomer" element={<SearchCustomer/>}/>
          </Route>
          <Route path="/userdashboard" element={<UserDashboard/>}>
            <Route index element={<UserProfile/>}/>
            <Route path="userprofile" element={<UserProfile/>}/>
            <Route path="purchases" element={<Purchases/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
