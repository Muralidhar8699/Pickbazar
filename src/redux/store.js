import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";

export default configureStore({
    reducer: {
        Types:productSlice,
        cart:cartSlice
    }
})