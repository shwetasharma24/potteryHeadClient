import React, { useState } from 'react';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import '../styles/slider.css';
import Button from '@mui/material/Button';
import { sliderItems } from '../resources/slidersData';
import { useHistory } from 'react-router';

const Slider = () => {

    const [sliderWrapperTransformValue, setSliderWrapperTransformValue] = useState(0);
    const history = useHistory();

    const handleArrowClick = (direction) => {
        if(direction === "left"){
            if(sliderWrapperTransformValue <= -100){
                setSliderWrapperTransformValue(sliderWrapperTransformValue+100);
                // console.log("SLIDER TRANSFORM VALUE", sliderWrapperTransformValue, direction);
            }
                
            else {
                setSliderWrapperTransformValue(-200);
            }
        }

        else if(direction === "right"){
            if(sliderWrapperTransformValue >= -100){
                setSliderWrapperTransformValue(sliderWrapperTransformValue-100);
            }
                
            else{
                setSliderWrapperTransformValue(0);
            } 
        }
    }

    const handleClick = () => {
        history.push("/products");
    }


    return (
        <div className="slider-container">
            <div className="slider-arrow-left" onClick={() => handleArrowClick("left")}>
                <ArrowLeftOutlinedIcon />
            </div>

            <div className="slider-wrapper" style={{ transform: `translateX(${sliderWrapperTransformValue}vw)` }}>

                {
                    sliderItems.map((sliderItem) => {
                        return(
                            <div key={sliderItem.id} className={`slider-slide${sliderItem.id}`}>
                                <div className="slider-image-container">
                                    <img className="slider-image" src={sliderItem.image} alt="" style={sliderItem.style}  />
                                </div>

                                <div className="slider-info-container">
                                    <h1 className="slider-title"> {sliderItem.title} </h1>

                                    <h4 className="slider-description"> {sliderItem.desciption} </h4>

                                    <Button className="slider-button" variant="contained" onClick={handleClick}> SHOP NOW </Button>
                                </div>
                            </div>
                        )
                    })
                }




                {/* <div className="slider-slide1">
                    <div className="slider-image-container">
                        <img className="slider-image" src={require('../images/slider1Image.png').default} alt="" style={{ marginTop: "70px" }} />
                    </div>

                    <div className="slider-info-container">
                        <h1 className="slider-title"> FESTIVE SALE! </h1>

                        <h4 className="slider-description"> BASIC IS BORING! STYLE YOUR HOME WITH OUR BEAUTIFUL POTTERY COLLECTION AT FLAT 25% OFF* </h4>

                        <Button className="slider-button" variant="contained" > SHOP NOW </Button>
                    </div>
                </div>

                <div className="slider-slide2">
                    <div className="slider-image-container">
                        <img className="slider-image" src={require('../images/slider2Image.png').default} alt="" style={{width: "450px", height: "550px",  marginLeft: "120px"}} />
                    </div>

                    <div className="slider-info-container">
                        <h1 className="slider-title"> CERAMIC MODERN ART </h1>

                        <h4 className="slider-description"> GET YOUR HANDS ON OUR LATEST COLLECTION OF CERAMIC MODERN ART PEICES. </h4>

                        <Button className="slider-button" variant="contained" > SHOP NOW </Button>
                    </div>
                </div>

                <div className="slider-slide3">
                    <div className="slider-image-container">
                        <img className="slider-image" src={require('../images/slider3Image.png').default} alt=""  style={{width: "550px", height: "480px", marginTop: "40px" }} />
                    </div>

                    <div className="slider-info-container">
                        <h1 className="slider-title"> MOST AESTHETIC PORCELAIN  </h1>

                        <h4 className="slider-description"> ALL EYES ON OUR BEAUTIFUL PORCELAIN POTTERY COLLECTION, NOW AT A DISCOUNTED PRICE TOO! </h4>

                        <Button className="slider-button" variant="contained" > SHOP NOW </Button>
                    </div>
                </div> */}
                
            </div>

            <div className="slider-arrow-right" onClick={() => handleArrowClick("right")} >
                <ArrowRightOutlinedIcon />
            </div>
        </div>
    )
}

export default Slider
