import axios from "axios";
import {store} from "../redux/store";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken;
// // let TOKEN = store.getState().user?.currentUser?.accessToken;

// console.log("STORE STATE:  ", store.getState());
// console.log("TOKEN: ", TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: {token: `Bearer ${TOKEN}`},
// })




const userRequest = () => {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
      },
    });
  
  
    // Set the token for any request
    instance.interceptors.request.use(function (config) {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken;
      config.headers.Token =  token ? `Bearer ${token}` : '';
      return config;
    });
  

    return instance;
  };
  
  export default userRequest();