import React, {useState, useEffect} from 'react';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import "../styles/singleProduct.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation } from 'react-router';
import { publicRequest } from '../axios/requestMethods';
import {addProduct} from "../redux/cartRedux";
// import { addToCart } from "../redux/apiCalls";
import {useDispatch} from 'react-redux';

const SingleProduct = () => {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    // const [cart, setCart] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try{
                const res = await publicRequest.get("/products/find/" + productId);
                setProduct(res.data);
            }
            catch(err){

            }
        }
        getProduct();
    }, [productId]);


    const handleQuantity = (type) => {
        if(type === 'dec'){
            if(quantity > 1)
                setQuantity(quantity-1);
        }
        else if(type === 'inc'){
            setQuantity(quantity + 1);
        }
    }

    const handleClick = () => {
        //update cart
        dispatch(addProduct({...product, quantity}));
        // setCart( {...product, quantity} );
        // console.log("CART::", {...product, quantity});
        // addToCart(dispatch, cart);
    }

    return (
        <div className="single-product-container">
            <Navbar /> 
            <Announcement />

            <div className="single-product-wrapper">
                <div className="single-product-image-container">
                    <img src={product.image} alt="POTTERY HERE" className="single-product-image" />
                </div>
                <div className="single-product-info-container">
                    <h1 className="single-product-title"> {product.title} </h1>
                    <p className="single-product-description"> {product.description} </p>
                    <h2 className="single-product-price"> ₹{product.price} </h2>
                    <p className="single-product-description"> <b>MATERIAL:</b> {product.material} </p>
                    <p className="single-product-description"> <b>COLOR:</b> {product.color}</p>

                    <div className="single-product-add-container">
                        <div className="single-product-amount-container">
                            <RemoveIcon 
                                onClick={ () => handleQuantity("dec") }
                                style={{cursor:"pointer"}} 
                            />
                            <span className="single-product-amount"> {quantity} </span>
                            <AddIcon 
                                onClick={ () => handleQuantity("inc") } 
                                style={{cursor:"pointer"}}
                            />
                        </div> 

                        <button 
                            className="single-product-button"
                            onClick={handleClick}
                        >ADD TO CART</button>
                    </div>
                </div>


            </div>

            <Newsletter />
            <Footer />
        </div>
    )
}

export default SingleProduct
