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
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
