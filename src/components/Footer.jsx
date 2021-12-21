import React from 'react';
import "../styles/footer.css";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { useHistory } from "react-router-dom";

const Footer = () => {

    const history = useHistory();

    return (
        <div className="footer-container">

            <div className="footer-left">
                <h2 className="footer-logo"> POTTERY HEAD </h2>
                
                <p className="footer-description"> Beautiful designs of pots, toys, decorations and divinities that are emblematic of a community’s heritage and links to the outside world.
                </p>

                <div className="footer-socials">
                    <a  className="footer-socials-icon"  href="https://www.facebook.com/"  target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#2962ff" }} >
                        <FacebookOutlinedIcon  />
                    </a>
                    <a className="footer-socials-icon"  href="https://www.instagram.com/?hl=en"  target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#cf46c7" }} >
                        <InstagramIcon  />
                    </a>
                    <a className="footer-socials-icon"  href="https://twitter.com/?lang=en"  target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#2962ff" }} >
                        <TwitterIcon  />
                    </a>
                </div>
            </div>



            <div className="footer-center">
                <h3 className="footer-center-title"> Useful Links </h3>

                <ul className="footer-list">
                    <li className="footer-list-item" onClick={() => history.push("/")} > Home </li>
                    <li className="footer-list-item" onClick={() => history.push("/cart")} > Cart </li>
                    <li className="footer-list-item" onClick={() => history.push("/products/pot")} > Earthen Clay Pots </li>
                    <li className="footer-list-item" onClick={() => history.push("/products/vase")} > Vase Variety </li>
                    <li className="footer-list-item" onClick={() => history.push("/products/indian decorative")} > Indian Pottery </li>
                    <li className="footer-list-item" onClick={() => history.push("/orders/find/userId")} >Order Tracking</li>
                    <li className="footer-list-item" onClick={() => history.push("/wishlist")} >Wishlist</li>
                    <li className="footer-list-item" onClick={() => history.push("/tandc")} >Terms and Conditions</li>                    
                </ul>
            </div>



            <div className="footer-right" >
                <h3 className="footer-right-title" > Contact </h3>
                
                <div className="footer-contact" > <LocationOnIcon style={{marginRight: "10px"}}  />  Shop No. 420, Hiranandani Estate, Thane, Maharashtra, India  </div>
                <div className="footer-contact" > <CallIcon style={{marginRight: "10px"}}  />  +91 9876543210 </div>
                <div className="footer-contact" > <EmailIcon style={{marginRight: "10px"}}  />  potteryhead@email.com </div>

                <img  className="footer-payment-image"  src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment icon here" />

            </div>

        </div>
    )
}

export default Footer
