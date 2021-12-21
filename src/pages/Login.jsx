import React, { useState } from 'react';
import "../styles/login.css";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state )=> state.user)

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h1 className="login-title">SIGN IN</h1>

                <form action="post" className="login-form"> 
                    <input className="login-input" type="email" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input className="login-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="login-button" onClick={handleClick} disabled={isFetching} > LOGIN </button>
                    { error && <span className="login-error-span"> Something went wrong </span> }
                </form>

                <div className="login-links">
                    <a style={{cursor:"pointer", textDecoration: "underline"}} onClick={() => history.push("/register")} className="login-register">CREATE A NEW ACCOUNT</a>
                    <a href={process.env.REACT_APP_ADMIN_URL} className="login-register">GO TO ADMIN LOGIN</a>
                </div>
            </div>
            
        </div>
    )
}

export default Login;
