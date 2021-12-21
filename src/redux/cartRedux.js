import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0, 
        
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },

        //ADD TO CART
        // addToCartStart: (state) => {
        //     state.isStarted= true;
        //     state.error= false;
        // },
        // addToCartSuccess: (state, action) => {
        //     state.isStarted= true;
        //     state.cart = action.payload.cart;
        //     state.error= false;
        // },
        // addToCartFailure: (state) => {
        //     state.isStarted= false;
        //     state.error= true;
        // },

        emptyCart : (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        },

        //EMPTY CART
        // emptyCartStart: (state) => {
        //     state.isStarted= true;
        //     state.error= false;
        // },
        // emptyCartSuccess: (state, action) => {
        //     state.isStarted= true;
        //     state.cart = {
        //         products: [],
        //         quantity: 0,
        //         total: 0,
        //     };
        //     state.error= false;
        // },
        // emptyCartFailure: (state) => {
        //     state.isStarted= false;
        //     state.error= true;
        // },


        //INCREASE QUANTITY OF A PRODUCT
        increaseProductQuantity: (state, action) => {
            state.products.find(product => product._id === action.payload._id).quantity += 1;
            state.total += action.payload.price * 1;
        },

        //DECREASE QUANTITY OF A PRODUCT
        decreaseProductQuantity: (state, action) => {
            state.products.find(product => product._id === action.payload._id).quantity -= 1;
            state.total -= action.payload.price * 1;
        },

        //REMOVE ITEM FROM CART
        removeProduct:  (state, action) => {
            state.quantity -= 1;
            state.total -= action.payload.price * action.payload.quantity;
            state.products = state.products.filter(product => product._id !== action.payload._id);
        },
    }
});


export const {
    addProduct, emptyCart, increaseProductQuantity, decreaseProductQuantity, removeProduct
} = cartSlice.actions
export default cartSlice.reducer;