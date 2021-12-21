import React, { useState } from 'react';
import "../styles/register.css";
import { login, register } from '../redux/apiCalls';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';

const Register = () => {

    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setUser(prev => {
            return { ...prev, [e.target.name]:e.target.value }
        });
    }

    const handleClick = async() => {
        if(user.password !== user.confirmPassword){
            setError(true);
        }
        else{
            const {confirmPassword, ...userToRegister} = user;
            // console.log("dispatching now........")
            await register(dispatch, userToRegister) ;
            const {fname, lname, email, ...userToLogin} = userToRegister
            await login(dispatch, userToLogin);
            history.push("/");
        }
    }

    return (
        <div className="register-container">
            <div className="register-wrapper">
                <h1 className="register-title">CREATE NEW ACCOUNT</h1>
                <div className="register-form">
                    <input className="register-input" type="text" placeholder="First Name" name="fname" required onChange={handleChange} />
                    <input className="register-input" type="text" placeholder="Last Name" name="lname" required onChange={handleChange} />
                    <input className="register-input" type="text" placeholder="Username" name="username" required onChange={handleChange} />
                    <input className="register-input" type="email" placeholder="Email" name="email" required onChange={handleChange} />
                    <input className="register-input" type="password" placeholder="Password" name="password" required onChange={handleChange} />
                    <input className="register-input" type="password" placeholder="Confirm Password" name="confirmPassword" required onChange={handleChange} />
                    <span className="register-agreement">By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></span>
                    <button className="register-button"  onClick={handleClick}> REGISTER </button>
                    { error && <span className='register-error'> PASSWORDS DON'T MATCH! </span> }

                    <div className="register-link">
                        <a style={{cursor:"pointer", textDecoration: "underline"}} onClick={() => history.push("/login")} className="register-login"> ALREADY HAVE AN ACCOUNT? SIGN IN </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
