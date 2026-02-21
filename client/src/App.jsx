import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./LayOut";
import AddCategories from "./Admin/AddCategories";

// Lazy imports
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Services = lazy(() => import("./Pages/Services"));
const Filter = lazy(() => import("./Filter/Filter"));
const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));
const PrimaryProduct = lazy(() => import("./Pages/PrimaryProduct"));
const Likes = lazy(() => import("./Pages/Likes"));
const CartItems = lazy(() => import("./Pages/CartItems"));
const ItemDetails = lazy(() => import("./Pages/ItemDetails"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const ShopNow = lazy(() => import("./Pages/ShopNow"));

const Laptops = lazy(() => import("./Categories/Laptops"));
const Mobiles = lazy(() => import("./Categories/Mobiles"));
const Tv = lazy(() => import("./Categories/Tv"));
const SmartWatches = lazy(() => import("./Categories/SmartWatches"));
const Watches = lazy(() => import("./Categories/Watches"));
const Keyboard = lazy(() => import("./Categories/Keyboard"));
const Mouse = lazy(() => import("./Categories/Mouse"));

const FilterByPrice = lazy(() => import("./Filter/FilterByPrice"));
const FilterByName = lazy(() => import("./Filter/FilterByName"));
const FilterByCategories = lazy(() => import("./Filter/FilterByCategories"));

const AdminDashboard = lazy(() => import("./Admin/AdminDashboard"));
const AdminProfile = lazy(() => import("./Admin/AdminProfile"));
const ProductInsert = lazy(() => import("./Admin/ProductInsert"));
const Update = lazy(() => import("./Admin/Update"));
const EditProductData = lazy(() => import("./Admin/EditProductData"));
const CustomerRecord = lazy(() => import("./Admin/CustomerRecord"));
const SearchCustomer = lazy(() => import("./Admin/SearchCustomer"));

const UserDashboard = lazy(() => import("./Users/UserDashboard"));
const UserProfile = lazy(() => import("./Users/UserProfile"));
const Purchases = lazy(() => import("./Users/Purchases"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />

            <Route path="home" element={<Home />}>
              <Route index element={<PrimaryProduct />} />
              <Route path="primaryproduct" element={<PrimaryProduct />} />
              <Route path="laptops" element={<Laptops />} />
              <Route path="mobiles" element={<Mobiles />} />
              <Route path="tv" element={<Tv />} />
              <Route path="smartwatches" element={<SmartWatches />} />
              <Route path="watches" element={<Watches />} />
              <Route path="keyboard" element={<Keyboard />} />
              <Route path="mouse" element={<Mouse />} />
            </Route>

            <Route path="likes" element={<Likes />} />
            <Route path="about" element={<About />} />

            <Route path="filter" element={<Filter />}>
              <Route index element={<FilterByPrice />} />
              <Route path="filterbyprice" element={<FilterByPrice />} />
              <Route path="filterbyprice/:priceChange" element={<FilterByPrice />} />
              <Route path="filterbyname" element={<FilterByName />} />
              <Route path="filterbyname/:input" element={<FilterByName />} />
              <Route path="filterbycategory" element={<FilterByCategories />} />
              <Route path="filterbycategory/:category" element={<FilterByCategories />} />
            </Route>

            <Route path="services" element={<Services />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cartitems" element={<CartItems />} />
            <Route path="itemdetails/:id" element={<ItemDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="shopnow/:id" element={<ShopNow />} />
          </Route>

          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route index element={<AdminProfile />} />
            <Route path="adminprofile" element={<AdminProfile />} />
            <Route path="insert" element={<ProductInsert />} />
            <Route path="update" element={<Update />} />
            <Route path="categories" element={<AddCategories />} />
            <Route path="editproductdata/:id" element={<EditProductData />} />
            <Route path="customerrecord" element={<CustomerRecord />} />
            <Route path="searchcustomer" element={<SearchCustomer />} />
          </Route>

          <Route path="/userdashboard" element={<UserDashboard />}>
            <Route index element={<UserProfile />} />
            <Route path="userprofile" element={<UserProfile />} />
            <Route path="purchases" element={<Purchases />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
