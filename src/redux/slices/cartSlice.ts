import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
  id: string;
  title: string; 
  price: number;  
  imageUrl: string; 
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[]
}

const cartData = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem(state, action: PayloadAction<CartItem>) {

      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if(findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }
        state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0)
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => {
        return obj.id !== action.payload
      });
    state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if(findItem) {
        findItem.count--
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum;
        }, 0)
      }
    },

    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },

  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);


export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;