import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import userRequest from "../axios/requestMethods";
import { useHistory } from 'react-router';
import { emptyCart } from '../redux/cartRedux';

const Success = () => {

    const location = useLocation();
    // console.log("location: ", location);

    const data = location.state.stripeData;
    // console.log("data: ", data);

    const cart = location.state.cart;
    // console.log("cart: ", cart);

    const currentUser = useSelector((state) => state.user.currentUser);

    const [orderId, setOrderId] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const createOrder = async() => {
            try{
                const res = await userRequest.post("/orders/add", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        productName: item.title,
                        productImage: item.image,
                        quantity: item.quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });

                setOrderId(res.data._id);
            }
            catch{}
        };

        data && createOrder();

    }, [cart, data, currentUser])


    const handleCick = () => {
        history.push("/");
        dispatch(emptyCart());
    }

    return (
        <div
            style={{
                height:"100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            { orderId 
                ? <>
                    <button 
                        style={{
                            border:"none",
                            width: 160,
                            borderRadius:5,
                            padding: "20px",
                            backgroundColor: "#009933",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "22px",
                            cursor: "pointer",
                            marginBottom: "20px"
                        }}
                    >
                        Successfull
                    </button> 

                    <p 
                        style={{
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                            fontSize: "17px"
                        }}
                    > 
                        Order has been created successfully. Your order number is ${orderId}
                    </p>
                </>
                : <> 

                    <p 
                        style={{
                            fontFamily: "sans-serif",
                            fontWeight: "500",
                            fontSize: "17px"
                        }}
                    > 
                        Your order is being prepared. <br /> Thanks for choosing Pottery Head! 
                    </p>

                </>
            } 

            <button 
                style={{ padding: 10, marginTop: 20 }}
                onClick={handleCick}
            >
                Go to Homepage
            </button>
        </div>
    )
}

export default Success
