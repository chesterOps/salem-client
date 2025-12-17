import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { productApi } from "./services/productApi";

import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: combineReducers({
    cart: cartSlice,
    [productApi.reducerPath]: productApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
