import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../constants/storage-keys";

const initialState = JSON.parse(localStorage.getItem(storageKeys.CART)) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const isExist = state.find((item) => item._id === product._id);

      if (isExist) {
        isExist.amount - +1;
        isExist.quantity += 1;
      } else {
        state.push({
          ...product,
          amount: product.quantity - 1,
          quantity: 1,
        });
      }
      localStorage.setItem(storageKeys.CART, JSON.stringify(state));
    },
    deleteProduct(state, action) {
      const { id } = action.payload;
      const updatedState = state.filter((product) => product._id !== id);
      localStorage.setItem(storageKeys.CART, JSON.stringify(updatedState));
      return updatedState;
    },
    increaseProductQty(state, action) {
      const { id } = action.payload;
      const product = state.find((product) => product._id === id);
      if (product) {
        product.amount -= 1;
        product.quantity += 1;
      }
      localStorage.setItem(storageKeys.CART, JSON.stringify(state));
    },
    decreaseProductQty(state, action) {
      const { id } = action.payload;
      const product = state.find((product) => product._id === id);
      if (product) {
        product.amount += 1;
        product.quantity -= 1;
      }
      localStorage.setItem(storageKeys.CART, JSON.stringify(state));
    },
    pay() {
      localStorage.setItem(storageKeys.CART, JSON.stringify([]));
      return [];
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  increaseProductQty,
  decreaseProductQty,
  pay,
} = cartSlice.actions;
export default cartSlice.reducer;
