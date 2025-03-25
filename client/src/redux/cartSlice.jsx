import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const counterSlice = createSlice({
  name: "addtoCart",
  name: "addtoLike",
  initialState: {
    cart: [],
    likes: [],
  },
  reducers: {
    addCartData: (state, action) => {
      const isProductInCart = state.cart.some((item) => item.id === action.payload.id);

      if (isProductInCart) {
        message.error("Product already added!");
      } else {
        state.cart.push(action.payload);
        message.success("Item added successfully!!");
      }
    },
    itemInc: (state, action) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == action.payload.id) {
          state.cart[i].qnty++;
        }
      }
    },

    itemDec: (state, action) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == action.payload.id) {
          if (state.cart[i].qnty <= 1) {
            state.cart = state.cart.filter(
              (item) => item.id != action.payload.id
            );
            message.success("Item Successfully removed!!");
          } else {
            state.cart[i].qnty--;
          }
        }
      }
    },
    itemDel: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload.id);
      message.error("Item Successfully removed!!");
    },

    addLikeData: (state, action) => {
      const proData = state.likes.filter((key) => key.id == action.payload.id);
      if (proData.length >= 1) {
        message.error("Product aleready liked!!");
      } else {
        state.likes.push(action.payload);
        message.success("Product succesfully added to likes");
      }
    },

    itemDislike: (state, action) => {
      state.likes = state.likes.filter((item) => item.id != action.payload.id);
      message.error("Item disliked!!");
    },
  },
});
export const {addCartData,itemInc,itemDec,itemDel,addLikeData,itemDislike} = counterSlice.actions;
export default counterSlice.reducer;
