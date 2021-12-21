import React from 'react';
import '../styles/navbar.css';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { logout } from '../redux/apiCalls';


const Navbar = () => {

    const cartQuantity = useSelector(state => state.cart.quantity);
    const wishlistQuantity = useSelector(state => state.wishlist.quantity);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        if(window.confirm("Are you sure you want to logout?")) {
            logout(dispatch);
            history.push("/login");
        }
    }

    return (
       <div className="navbar-container">
           <div className="navbar-wrapper">

               {/* <div className="navbar-left">
                   <span className="navbar-language"> EN </span>
                   <div className="navbar-search-container">
                       <input className="navbar-input" placeholder="Search" ></input> 
                       <SearchOutlinedIcon style={{ fontSize:16 }} />
                   </div>
               </div> */}

               <div className="navbar-left">
                   <h2> POTTERY HEAD. </h2>
               </div>

               <div className="navbar-right">
                    <div className="navbar-menu-item" onClick={() => history.push("/")}> <b>Home</b> </div>

                   <div className="navbar-menu-item" onClick={handleLogout}> <b>Logout</b> </div>

                   <div className="navbar-menu-item" onClick={() => history.push("/orders")}> <b>My Orders</b> </div>

                   <Link to="/cart">
                    <div className="navbar-menu-item" >
                        <Badge badgeContent={cartQuantity} color="primary">
                            <ShoppingCartOutlinedIcon style={{color:"black"}} />
                        </Badge>
                    </div>
                   </Link>

                   <Link to="/wishlist">
                    <div className="navbar-menu-item" >
                        <Badge badgeContent={wishlistQuantity} color="primary">
                            <FavoriteBorderOutlinedIcon style={{color:"black" }} />
                        </Badge>
                    </div>
                   </Link>
               </div>    
           </div>
       </div>
    )
}

export default Navbar
