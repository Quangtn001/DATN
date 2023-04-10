import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService.js";
import authReducer from "./reducers/authReducer.js";
import globalReducer from "./reducers/globalReducer.js";
import categoryService from "./services/categoryService.js";
import productService from "./services/productService.js";
const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      categoryService.middleware,
      productService.middleware,
    ]),
});
export default Store;
