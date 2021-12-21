import { publicRequest, userRequest } from "../axios/requestMethods";
// import { addToCartFailure, addToCartStart, addToCartSuccess } from "./cartRedux";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerStart, registerSuccess, registerFailure, } from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }
    catch(err){
        dispatch(loginFailure());
    }
}


export const register = async(dispatch, user) => {
    dispatch(registerStart());
    try{
        const res = await publicRequest.post("/auth/register", user);
        dispatch(registerSuccess(res.data));
    }
    catch(err){
        dispatch(registerFailure());
    }
}


export const logout = async (dispatch) => {
    dispatch(logoutStart());
    try{
        dispatch(logoutSuccess());
    }
    catch(err) {
        dispatch(logoutFailure());
    }
}


// export const addToCart = async(dispatch, cart) => {
//     dispatch(addToCartStart());
//     try{
//         const res = await userRequest.post("/carts/add", cart);
//         dispatch(addToCartSuccess(res.data));
//     }
//     catch(err){
//         dispatch(addToCartFailure());
//     }
// }