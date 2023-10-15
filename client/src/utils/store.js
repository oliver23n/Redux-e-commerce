import { configureStore, createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name: "store",
    initialState: {
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: "",
    },
    reducers: {
        UPDATE_PRODUCTS: (state, { payload }) => {
            state.products = [...payload.products];
        },
        ADD_TO_CART: (state, { payload }) => {
            state.cartOpen = true;
            state.cart = [...state.cart, payload.product];
        },
        ADD_MULTIPLE_TO_CART: (state, { payload }) => {
            state.cart = [...state.cart, ...payload.products];
        },
        UPDATE_CART_QUANTITY: (state, { payload }) => {
            state.cartOpen = true;
            state.cart = state.cart.map((product) => {
                if (payload._id === product._id) {
                    product.purchaseQuantity = payload.purchaseQuantity;
                }
                return product;
            });
        },
        REMOVE_FROM_CART: (state, { payload }) => {
            let newState = state.cart.filter(
                (product) => product._id !== payload._id
            );
            state.cartOpen = newState.length > 0;
            state.cart = newState;
        },
        CLEAR_CART: (state) => {
            state.cartOpen = false;
            state.cart = [];
        },
        TOGGLE_CART: (state) => {
            state.cartOpen = !state.cartOpen;
        },
        UPDATE_CATEGORIES: (state, { payload }) => {
            state.categories = [...payload.categories];
        },
        UPDATE_CURRENT_CATEGORY: (state, { payload }) => {
            state.currentCategory = payload.currentCategory;
        },
    },
});

export const {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    CLEAR_CART,
    TOGGLE_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} = storeSlice.actions;

export const store = configureStore({
    reducer: {
        store: storeSlice.reducer,
    },
});