import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "addtoCart",
  initialState: {
    cart: [],
  },
  reducers: {
    addCartData: (state, action) => {
      const proData = state.cart.filter((key) => key.id == action.payload.id);
      console.log(proData);
      if (proData.length >= 1) {
        alert("Product aleready added!");
      } else {
        state.cart.push(action.payload);
        alert("Product succesfully added!");
      }
    },
  },

  itemInc: (state, action) => {
    for (var i = 0; i < state.cart.length; i++) {
      if (state.cart[i].id == action.payload.id) {
        state.cart[i].qnty++;
      }
    }
  },

  itemDec: (state, action) => {
    console.log("HELLO");
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
  dataDel: (state, action) => {
    state.cart = state.cart.filter((item) => item.id != action.payload.id);
    message.success("Item Successfully removed!!");
  },
});

export const { addCartData, itemInc, itemDec, itemDel } = counterSlice.actions;
export default counterSlice.reducer;
