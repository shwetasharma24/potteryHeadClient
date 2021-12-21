import {createSlice} from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],
        quantity: 0, 
    },
    reducers: {
        //ADD PRODUCT TO WISHLIST
        addToWishlist: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
        },

        //EMPTY WISHLIST
        emptyWishlist : (state) => {
            state.quantity = 0;
            state.products = [];
        },

        //REMOVE ITEM FROM WISHLIST
        removeFromWishlist:  (state, action) => {
            state.quantity -= 1;
            state.products = state.products.filter(product => product._id !== action.payload._id);
        },
    }
});


export const {
    addToWishlist, emptyWishlist, removeFromWishlist
} = wishlistSlice.actions
export default wishlistSlice.reducer;