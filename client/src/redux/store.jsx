import { configureStore } from '@reduxjs/toolkit'
import countReducer from "./cartSlice";
import likeReducer from "./cartSlice";
const store = configureStore({
    reducer: {
        addtoCart:countReducer,
        addtoLike:likeReducer
    },
})

export default store;