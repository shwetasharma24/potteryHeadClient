import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import "../styles/wishlist.css";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { emptyWishlist, removeFromWishlist } from "../redux/wishlistRedux";
import { addProduct } from '../redux/cartRedux';

const Wishlist = () => {

    const wishlist = useSelector(state => state.wishlist);
    let history = useHistory();
    const dispatch = useDispatch();



    return (
        <div className="wishlist-container">
            <Navbar />
            <Announcement />
            
            <div className="wishlist-wrapper">
                <h1 className="wishlist-title">YOUR WISHLIST</h1>

                <div className="wishlist-top">
                    <button className="wishlist-top-button1" onClick={()=> history.push("/products")}>
                      CONTINUE SHOPPING 
                    </button>

                    
                    <button className="wishlist-top-button2" onClick={() => {
                          window.confirm("Do you wish to remove all items from wishlist?") &&  dispatch(emptyWishlist()) }}
                    >
                        EMPTY WISHLIST
                    </button>
                    
                </div>


                <div className="wishlist-bottom">
                    <div className="wishlist-info">
                        {wishlist.products.map(product => (
                            <>
                            <div key={product._id} className="wishlist-product">
                                <div className="wishlist-product-detail">
                                    <img className="wishlist-image" src={product.image} alt="" />
                                    <div className="wishlist-details">
                                        <span className="wishlist-product-name"> <b>Product:</b> {product.title}</span>
                                        <span className="wishlist-product-id"> <b>ID:</b> {product._id} </span>   
                                    </div>
                                </div>

                                <div className="wishlist-price-detail">
                                    <div className="wishlist-product-amount-container">    
                                    </div>
                                    <div className="wishlist-product-price"> ₹ {product.price} </div>
                                     <br />

                                    <div className="wishlist-buttons">
                                        <button className="wishlist-top-button1" onClick={()=> dispatch(removeFromWishlist(product))}>
                                            REMOVE FROM WISHLIST 
                                        </button>
                                        <br />
                                        <button className="wishlist-top-button2" onClick={()=> {
                                                dispatch(addProduct(product));
                                                dispatch(removeFromWishlist(product));
                                            }}
                                        >
                                            MOVE TO CART 
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr className="wishlist-hr" />
                            </>
                        ))}
     
                    </div>
                </div>

            </div>
            
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Wishlist
