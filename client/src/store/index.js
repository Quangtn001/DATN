import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService.js";
import authReducer from "./reducers/authReducer.js";
import globalReducer from "./reducers/globalReducer.js";
import categoryService from "./services/categoryService.js";
const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      categoryService.middleware,
    ]),
});
export default Store;
