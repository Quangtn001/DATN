import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import AdminLogin from "../pages/auth/AdminLogin";
import Products from "../pages/dashboard/Products";
import Private from "./Private.js";
import Public from "./Public";
import Category from "../pages/dashboard/Category";
import CreateCategory from "../pages/dashboard/CreateCategory";
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
            path="categories"
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
