import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import "../styles/cart.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import userRequest from "../axios/requestMethods";
import { useHistory } from "react-router-dom";
import { decreaseProductQuantity, emptyCart, increaseProductQuantity, removeProduct } from '../redux/cartRedux';

const KEY = process.env.REACT_APP_STRIPE_KEY;

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    let history = useHistory();
    const dispatch = useDispatch();

    const onToken = (token) => {
        setStripeToken(token);
    }
    // console.log(stripeToken);

    useEffect(() => {
        const makeRequest = async() => {
            try{
                const res = await userRequest.post(
                    "/checkout/payment", 
                    {
                        tokenId: stripeToken.id,
                        amount: cart.total * 100,
                    }
                );
                history.push("/success", {
                        stripeData: res.data,
                        cart: cart,  
                });
            }
            catch(err){

            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history])

    return (
        <div className="cart-container">
            <Navbar />
            <Announcement />
            
            <div className="cart-wrapper">
                <h1 className="cart-title">YOUR CART</h1>

                <div className="cart-top">
                    <button className="cart-top-button1" onClick={()=> history.push("/products")}>
                      CONTINUE SHOPPING 
                    </button>

                    <div className="cart-top-texts">
                        <span className="cart-top-text"> Shopping Bag({cart.quantity}) </span>
                        <span className="cart-top-text" onClick={() => history.push("/wishlist")} > Your Wishlist </span>
                    </div>    

                    
                    <button className="cart-top-button2" onClick={() => {
                          window.confirm("Do you wish to remove all items from cart?") &&  dispatch(emptyCart()) }}
                    >
                        EMPTY CART
                    </button>
                    
                </div>


                <div className="cart-bottom">
                    <div className="cart-info">
                        {cart.products.map(product => (
                            <>
                            <div key={product._id} className="cart-product">
                                <div className="cart-product-detail">
                                    <img className="cart-image" src={product.image} alt="" />
                                    <div className="cart-details">
                                        <span className="cart-product-name"> <b>Product:</b> {product.title}</span>
                                        <span className="cart-product-id"> <b>ID:</b> {product._id} </span>   
                                    </div>
                                </div>

                                <div className="cart-price-detail">
                                    <div className="cart-product-amount-container">
                                        <span 
                                            onClick={ () => product.quantity>1 && dispatch(decreaseProductQuantity(product)) } 
                                            style={{cursor:"pointer"}}
                                        > 
                                            <RemoveIcon /> 
                                        </span>
                                        <div className="cart-product-amount"> {product.quantity} </div>
                                        <span 
                                            onClick={ () => dispatch(increaseProductQuantity(product)) }
                                            style={{cursor:"pointer"}}
                                        > 
                                            <AddIcon /> 
                                        </span>
                                    </div>
                                    <div className="cart-product-price"> ₹ {product.price * product.quantity} </div>
                                    <br /> <br />
                                    <button className="cart-top-button1" onClick={()=> dispatch(removeProduct(product))}>
                                        REMOVE FROM CART 
                                    </button>
                                </div>
                            </div>
                            <hr className="cart-hr" />
                            </>
                        ))}


                        
                    </div>
                    <div className="cart-summary">
                        <h1 className="cart-summary-title" > ORDER SUMMARY</h1>
                        <div className="cart-summary-item">
                            <span className="cart-summary-item-text"> Subtotal </span>
                            <span className="cart-summary-item-price"> ₹ {cart.total} </span>
                        </div>
                        <div className="cart-summary-item">
                            <span className="cart-summary-item-text"> Shipping Charges</span>
                            <span className="cart-summary-item-price"> ₹120 </span>
                        </div>
                        <div className="cart-summary-item">
                            <span className="cart-summary-item-text"> Shipping Discount </span>
                            <span className="cart-summary-item-price"> - ₹120 </span>
                        </div>
                        <div className="cart-summary-item" style={{fontWeight: "500", fontSize: "24px"}}>
                            <span className="cart-summary-item-text" > Total </span>
                            <span className="cart-summary-item-price"> ₹ {cart.total} </span>
                        </div>
                        <StripeCheckout 
                            name="Pottery Head" 
                            image="https://i.pinimg.com/736x/d6/0f/25/d60f25a4791d63bae523142d92896b20.jpg"
                            billingAddres
                            shippingAddress
                            description={`Your total is ₹ ${cart.total}`}                            
                            amount= {cart.total*100}
                            currency="INR"
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <button className="cart-summary-button"> CHECKOUT NOW </button>
                        </StripeCheckout>
                    </div>
                </div>

            </div>
            
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Cart
