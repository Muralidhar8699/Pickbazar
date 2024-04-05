import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ProductSlice = createSlice({
    name: "product",
    initialState: {
        ProductTypes: {
            status: "pending",
            value: {},
            error: null,
            imgdata :"grocery",
            filter:"grocery"
        }
    },
    reducers: {
        filterproducts: (state, action) => {
            state.ProductTypes.filter = action.payload;
            // In Redux, a payload is the actual data being passed in an action. It is included in the action object as the payload property. The 'payload' is the information that is being sent to the Redux store.

            // In this code, 'payload' is set to e.slug, which is the slug property of the element that was clicked. When the filterproducts function is called, it updates the filter property of the 'ProductTypes' object in the Redux store with the slug value of the clicked element. This filtering of products based on the slug value is then used to update the list of products displayed on the screen.
        },
        backgroundimg: (state,action) => {
            state.ProductTypes.imgdata = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductTypes.pending, (state, action) => {
            state.ProductTypes.status = 'pending';
            state.ProductTypes.value = [];
            state.ProductTypes.error = null;
        })
        builder.addCase(fetchProductTypes.fulfilled, (state, action) => {
            state.ProductTypes.status = 'fulfilled';
            state.ProductTypes.value = action.payload;
            state.ProductTypes.error = null;
        })
        builder.addCase(fetchProductTypes.rejected, (state, action) => {
            state.ProductTypes.status = 'rejected';
            state.ProductTypes.value = [];
            state.ProductTypes.error = action.error;
        })
    }

})
export const fetchProductTypes = createAsyncThunk("fetch/ProductTypes", async () => {
    const { data } = await axios.get('https://mock.redq.io/api/types?limit=15&language=en');
    return data;
})
export const { filterproducts, backgroundimg } = ProductSlice.actions;
export default ProductSlice.reducer;