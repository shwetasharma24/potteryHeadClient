import React from 'react';
import { categories } from '../resources/categoriesData';
import CategoryItem from './CategoryItem';
import '../styles/categories.css';

const Categories = () => {
    return (
        <div className="caterogies-container">
            {
                categories.map((category) => (
                    <CategoryItem key={category.id} item={category} />
                ))
            }
        </div>
    )
}

export default Categories
