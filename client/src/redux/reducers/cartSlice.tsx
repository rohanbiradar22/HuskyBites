// cartSlice.ts
// import { FoodItem } from "@/interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "./../store";
import { CartItem } from "@/models/foodItem";
import { updateCartAction } from "../actions/cart-actions";

interface CartState {
  cart: CartItem[];
  userId: string;
  loading: boolean;
  error: null | string;
}

const localStorageKey = "cart"; // Key for local storage

const isBrowser = () => typeof window !== "undefined";

// Load cart state from local storage
const loadCartFromLocalStorage = (): CartState => {
  if (isBrowser()) {
    const storedCart = localStorage.getItem(localStorageKey);
    let storedCartData = storedCart ? JSON.parse(storedCart) : { cart: [] };
    return storedCartData;
  } else {
    // Return a default initial state when not in a browser environment
    return { cart: [], userId: "", loading: false, error: null };
  }
};

const initialState: CartState = loadCartFromLocalStorage();

// const initialState: CartState = {
//   cart: [],
//   loading: false,
//   error: null,
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingCartItemIndex = state.cart.findIndex(
        (item) => item.foodItem._id === action.payload.foodItem._id
      );

      if (existingCartItemIndex !== -1) {
        state.cart[existingCartItemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      // Save to local storage
      if (isBrowser()) {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ foodItemId: string; quantity: number }>
    ) => {
      const { foodItemId, quantity } = action.payload;
      const existingCartItem = state.cart.find(
        (item) => item.foodItem._id === foodItemId
      );

      if (existingCartItem) {
        existingCartItem.quantity = quantity;
      }

      // Save to local storage
      if (isBrowser()) {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.foodItem._id !== action.payload
      );

      // Save to local storage
      if (isBrowser()) {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.cart = [];

      // Save to local storage
      if (isBrowser()) {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },
    attachUserToCart: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      if (isBrowser()) {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },
  },
});

export const {
  addToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
  attachUserToCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
