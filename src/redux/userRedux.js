import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {

        //LOGIN
        loginStart: (state) => {
            state.isFetching= true;
            state.error= false;
        },
        loginSuccess: (state, action) => {
            state.isFetching= false;
            state.currentUser = action.payload;
            state.error= false;
        },
        loginFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },

        //REGISTER
        registerStart: (state) => {
            state.isFetching= true;
            state.error= false;
        },
        registerSuccess: (state, action) => {
            state.isFetching= false;
            state.currentUser = action.payload;
            state.error= false;
        },
        registerFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },

        //LOGOUT
        logoutStart: (state) => {
            state.isFetching= true;
            state.error = false;
        },
        logoutSuccess: (state) => {
            state.isFetching= false;
            state.currentUser = null;
            state.error = false;
        },
        logoutFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },
    }
});


export const {
    loginStart, 
    loginSuccess, 
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    registerStart,
    registerSuccess,
    registerFailure,
} = userSlice.actions
export default userSlice.reducer;