import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { productApi } from "./services/productApi";

import cartSlice, {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "./cartSlice";

// Local storage middleware to persist cart state
const localStorageMiddleware = createListenerMiddleware();

// Listen for cart-related actions and update localStorage
localStorageMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem, increaseQuantity, decreaseQuantity),
  effect: async (_action, listenerApi) => {
    // Get the current state
    const state = listenerApi.getState() as RootState;
    const cartState = state.cart;
    localStorage.setItem("salem-cart", JSON.stringify(cartState.items));
  },
});

// Configure the Redux store
export const store = configureStore({
  reducer: combineReducers({
    cart: cartSlice,
    [productApi.reducerPath]: productApi.reducer,
  }),
  // Add localStorage middleware to persist cart state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(localStorageMiddleware.middleware)
      .concat(productApi.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
