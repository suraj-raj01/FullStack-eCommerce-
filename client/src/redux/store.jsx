import { configureStore } from '@reduxjs/toolkit'
import countReducer from "./cartSlice";
const store = configureStore({
    reducer: {
        addtoCart:countReducer
    },
})

export default store;