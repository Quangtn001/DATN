import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import AdminLogin from "../pages/auth/AdminLogin";
import Products from "../pages/dashboard/Products";
import Private from "./Private.js";
import Public from "./Public";
import Category from "../pages/dashboard/Category";
import CreateCategory from "../pages/dashboard/CreateCategory";
import UpdateCategory from "../pages/dashboard/UpdateCategory";
import CreateProduct from "../pages/dashboard/CreateProduct";
import EditProduct from "../pages/dashboard/EditProduct";
import { HomePage } from "../pages/Home/HomePage";
import Login from "../pages/Home/auth/Login";
import Register from "../pages/Home/auth/Register";
import { Dashboard } from "../pages/users/Dashboard";
import UserRoute from "./UserRoute";
import UserAuthRoute from "./UserAuthRoute";
import CatProduct from "../pages/Home/CatProduct";
import ProductDetails from "../pages/Home/ProductDetails";
import SearchProducts from "../pages/Home/SearchProducts";
import Cart from "../pages/Home/Cart";
import Orders from "../pages/dashboard/Orders";
import OrderDetails from "../pages/dashboard/OrderDetails";
import UserOrder from "../pages/users/UserOrder";
import UserOrderDetails from "../pages/users/UserOrderDetails";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cat-products/:name" element={<CatProduct />} />
        <Route path="/cat-products/:name/:page" element={<CatProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/search-products/:keyword/:page"
          element={<SearchProducts />}
        />{" "}
        <Route path="/cart" element={<Cart />} />
        <Route element={<UserAuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/user" element={<Dashboard />} />
          <Route path="/orders" element={<UserOrder />} />
          <Route path="/orders/:page" element={<UserOrder />} />
          <Route
            path="/user-order-details/:id"
            element={<UserOrderDetails />}
          />
        </Route>
        <Route path="auth">
          <Route
            path="admin-login"
            element={
              <Public>
                <AdminLogin />
              </Public>
            }
          />
        </Route>
        <Route path="dashboard">
          <Route
            path="products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="products/:page"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="edit-product/:id"
            element={
              <Private>
                <EditProduct />
              </Private>
            }
          />
          <Route
            path="categories"
            element={
              <Private>
                <Category />
              </Private>
            }
          />
          <Route
            path="categories/:page"
            element={
              <Private>
                <Category />
              </Private>
            }
          />
          <Route
            path="create-category"
            element={
              <Private>
                <CreateCategory />
              </Private>
            }
          />
          <Route
            path="update-category/:id"
            element={
              <Private>
                <UpdateCategory />
              </Private>
            }
          />
          <Route
            path="create-product"
            element={
              <Private>
                <CreateProduct />
              </Private>
            }
          />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:page" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
