import React, { useState, useEffect } from 'react';
import '../styles/product.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../redux/cartRedux';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistRedux';


const Product = ({product}) => {

    const dispatch = useDispatch();
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
    // const [state, setstate] = useState(initialState)

    // useEffect(() => {
       
    // }, [isAddedToCart, isAddedToWishlist])


    const handleCartClick = () => {
        //update cart
        if(!isAddedToCart){
            dispatch(addProduct({...product, quantity:1}));
            setIsAddedToCart(true);
        }
        else{
            dispatch(removeProduct({...product, quantity:1}))
            setIsAddedToCart(false);
        }
    }

    const handleWishlistClick = () => {
        //update wishlist
        if(!isAddedToWishlist){
            dispatch(addToWishlist({...product, quantity:1}));
            setIsAddedToWishlist(true);
        }
        else{
            dispatch(removeFromWishlist({...product, quantity:1}));
            setIsAddedToWishlist(false);
        }
    }

    // console.log("isAdded to Cart: ", isAddedToCart);

    return (
        <div className="product-container">

            <div className="product-circle">

                <img src={product.image} alt="" className="product-image" style={{border: "1px solid #DCDCDC"}} /> 

                <div className="product-info">

                    <Tooltip title={product.title}> 
                        <div className="product-description">
                            {product.title}
                        </div>
                    </Tooltip>

                    <h5 className="product-price"> ₹ {product.price}</h5>

                    <div className="product-icons">

                        <div className="product-icon" onClick={handleCartClick} >
                            <Tooltip title="Add to Cart">
                                { isAddedToCart ? <ShoppingCartIcon style={{color: "success"}} />  :  <ShoppingCartOutlinedIcon style={{height: "3vh"}} /> }
                            </Tooltip>
                        </div>

                        <div className="product-icon">
                            <Tooltip title="View This">
                                <Link to={`/product/${product._id}`}>
                                    <SearchOutlinedIcon style={{height: "3vh", color: "#303030"}} />
                                </Link>
                            </Tooltip>
                        </div>
                        <div className="product-icon" onClick={handleWishlistClick}>
                            <Tooltip title="Wishlist">
                                { isAddedToWishlist ? <FavoriteIcon style={{color: "success"}} /> :  <FavoriteBorderOutlinedIcon style={{height: "3vh"}}  /> }
                            </Tooltip>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product
