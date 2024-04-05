import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            CartProducts: [],
            totalPrice: 0,
        }
    },
    reducers: {
        addToCart: (state, action) => {
            const cart = state.value
            const product = action.payload
            let price = product.price;
            if (product.discount) price -= product.discount;
            if (cart.CartProducts.length) {
                const index = cart.CartProducts.findIndex(e => e.id == product.id);
                if (index == -1) {
                    cart.CartProducts.push({
                        ...product,
                        producQty: 1,
                    })
                    cart.totalPrice += price
                } else {
                    cart.CartProducts[index] = {
                        ...cart.CartProducts[index],
                        producQty: cart.CartProducts[index].producQty + 1
                    };
                    cart.totalPrice += price
                }

            } else {
                cart.CartProducts.push({
                    ...product,
                    producQty: 1,
                });
                cart.totalPrice = price
            }
            state.value = cart;
        },
        deleteCart: (state, action) => {
            let cart = state.value
            cart = {
                CartProducts: [],
                totalPrice: 0
            }
            state.value = cart
        },
        deleteProduct: (state, action) => {
            let cart = state.value
            let product = action.payload
            let price = product.price
            cart.CartProducts = cart.CartProducts.filter(item => item.id !== product.id);
            cart.totalPrice -= price * product.producQty
            state.value = cart
        },
        removefromCart: (state, action) => {
            let cart = state.value
            const product = action.payload
            let price = product.price
            if (product.discount) price -= product.discount
            if (cart.totalPrice == 0) return;
            const proindex = cart.CartProducts.findIndex(e => e.id == product.id);
            if (proindex == -1) return;
            if (cart.CartProducts[proindex].producQty == 1) {
                cart.totalPrice -= price;
                if(cart.totalPrice < 1) cart.totalPrice = 0;
                cart.CartProducts = cart.CartProducts.filter(e => e.id !== product.id)

            } else {
                cart.CartProducts[proindex].producQty--;
                cart.totalPrice -= price;
            }
            state.value = cart
        }
    }
});

export const { addToCart, deleteCart, deleteProduct, removefromCart } = cartSlice.actions;

export default cartSlice.reducer