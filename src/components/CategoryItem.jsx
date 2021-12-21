import React, { useState }  from 'react'
import '../styles/categoryItem.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const CategoryItem = ({item}) => {

    const [opacityValue, setOpacityValue] = useState(1);

    const handleMouseEnter = () => {
        setOpacityValue(0.8);
    }
    const handleMouseLeave = () => {
        setOpacityValue(1);
    }

    return (
        <div 
            className="caterogyItem-container" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
        >
            <Link to={`/products/${item.category}`} >      
                <img 
                    src={item.image} 
                    alt=" Category item here" className="categoryItem-image"
                    style={{opacity: opacityValue}} 
                />

                <div className="categoryItem-info" >
                    <h2 className="categoryItem-title">
                        {item.title}
                    </h2>
                    <Button variant="contained" >SHOP NOW</Button>
                </div>
            </Link>

        </div>
    )
}

export default CategoryItem
