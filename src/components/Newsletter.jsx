import React, {useState, useEffect} from 'react';
import "../styles/newsletter.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import * as emailjs from 'emailjs-com';
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Newsletter = () => {

    const [subscriptionEmail, setSubscriptionEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [open, setOpen] = useState(false);

    const username = useSelector(state => state.user.currentUser.fname);
    
    const handleClick = () => {
        const from_name = username;
        const from_email = subscriptionEmail;
        const templateParams = {from_name:from_name, from_email:from_email};

        emailjs.send(process.env.REACT_APP_EMAIL_JS_SERVICE_ID, process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAIL_JS_USER_ID)
        .then(function(response) {
            setOpen(true);
            setIsSubscribed(true);
            setSubscriptionEmail("");
        }, function(error) {
           console.log('FAILED...', error);
        });

    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    


    return (
        <div className="newsletter-container">
            
            <h1 className="newsletter-title">Newsletter</h1>

            <div className="newsletter-description">
                Get timely updates for your favorite products.
            </div>

            <div className="newsletter-input-container"> 
                    <input className="newsletter-input" type="text" placeholder="Your email" name="subscriptionEmail" value={subscriptionEmail} onChange={(e) => setSubscriptionEmail(e.target.value)} />
                    <Button 
                    // type="submit"
                    style={{ 
                            color: "white", 
                            flex: "1",
                            backgroundColor: "teal" 
                        }}
                    onClick={handleClick}
                    > 
                        <SendIcon /> 
                    </Button>

                    { isSubscribed &&  (
                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            // message="Subscribed to Newsletter!"
                            action={action}
                        >
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Subscribed to Newsletter!
                            </Alert>
                        </Snackbar>
                        )
                    }
               
            </div>

        </div>
    )
}

export default Newsletter
