import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  price: number;
  discount?: number;
  size: string;
  color: string;
  title: string;
  image: string;
  slug: string;
  quantity: number;
};

// Load cart from localStorage
const loadCartFromLocalStorage = (): Array<CartItem> => {
  try {
    const serializedCart = localStorage.getItem("salem-cart");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Error loading cart from localStorage:", err);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    // Adds an item to the cart
    addItem: (
      state,
      action: {
        payload: CartItem;
      }
    ) => {
      // Check if the item with particular color and size already exists in the cart
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        return;
      }
      // If it doesn't exist, add the new item
      state.items.push(action.payload);
    },
    // Removes an item from the cart by its ID
    removeItem: (state, action: { payload: { id: string } }) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    // Increases the quantity of an item
    increaseQuantity: (state, action: { payload: { id: string } }) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    // Decreases the quantity of an item or removes it if quantity reaches zero
    decreaseQuantity: (state, action: { payload: { id: string } }) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
    },
  },
});

// Exporting actions and reducer
export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

// Getters
export const getCartItems = (state: {
  cart: {
    items: Array<CartItem>;
  };
}) => state.cart.items;

export const getCartTotal = (state: {
  cart: {
    items: Array<CartItem>;
  };
}) =>
  state.cart.items.reduce((total: number, item) => {
    return total + item.price * item.quantity;
  }, 0);

export const getCartItemCount = (state: {
  cart: {
    items: Array<CartItem>;
  };
}) =>
  state.cart.items.reduce((count: number, item) => count + item.quantity, 0);

export const getCartDiscountTotal = (state: {
  cart: {
    items: Array<CartItem>;
  };
}) =>
  state.cart.items.reduce((discountTotal: number, item) => {
    if (item.discount) {
      const discountAmount = (item.price * item.discount) / 100;
      return discountTotal + discountAmount * item.quantity;
    }
    return discountTotal;
  }, 0);

export default cartSlice.reducer;
