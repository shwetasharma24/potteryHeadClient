import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import userRequest from "../axios/requestMethods";
import { useSelector, useDispatch } from 'react-redux';
import "../styles/orders.css";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const userId = useSelector(state => state.user.currentUser._id);
    

    useEffect(() => {
        
        const getOrders = async () => {
            const res = await userRequest.get(`/orders/find/${userId}`);
            setOrders(res.data);
        }

        getOrders();

    }, [])

    // console.log("ORDERS::::::",orders);

    return (
        <div className="orders-container">
            <Navbar />
            <Announcement />
            
            <div className="orders-wrapper">
                {
                    orders.length>0 ?
                    <h1 className="orders-title">YOUR ORDERS</h1>  :
                    <h1 className="orders-title">NO ORDERS YET</h1>
                }

                <div className="orders-bottom">
                    <div className="orders-info">
                        {orders.map(order => (
                            <>
                            <div key={order._id} className="orders-product">
                                
                                {
                                    order.products.map((product) => (
                                        <div className="orders-details">
                                            <img className="orders-product-image" src={product.productImage} />
                                            <span className="orders-product-name"> <b>Name:</b> {product.productName}</span>
                                            <span className="orders-product-id"> <b>Quantity:</b> {product.quantity} </span>   
                                        </div>
                                    ))
                                }


                                <div className="orders-price-detail">
                                    <div className="orders-product-amount-container">    
                                    </div>
                                    <div className="orders-product-price"> <b>Amount:</b> ₹ {order.amount} </div>
                                    <div>
                                        <span className="orders-product-address"> <b>Address:</b> {order.address.line1}, {order.address.city}, {order.address.country}, {order.address.postal_code}</span>
                                            <button className="orders-product-status"> <b>Status:</b> {order.status} </button> 
                                        </div>
                                     <br />

                                </div>
                            </div>
                            <hr className="orders-hr" />
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

export default Orders;