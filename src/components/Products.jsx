import React, { useState, useEffect } from 'react';
import '../styles/products.css';
import Product from './Product';
import axios from "axios";

const Products = ({category, search, filters, sort}) => {
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // console.log("SEARCH LENGTH: ", search?.length);

    useEffect(() => {
        const getProducts = async() => {
            try{

                const res =  await axios.get( category ? `${process.env.REACT_APP_BASE_URL}/products?category=${category}` : `${process.env.REACT_APP_BASE_URL}/products` );

                // console.log(res.data);
                
                setProducts(res.data);

            }catch(err){

            }
        }
        getProducts();
    }, [category]);

    // console.log("PRODUCTS: ", products);


    useEffect(() => {
        if(search) {  
            setFilteredProducts(
                products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
            );
        }
    }, [products, search])


    useEffect(() => {
        if(category||filters) {  
            search.length===0 
            ? 
                setFilteredProducts(
                    products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
                )
            :
                setFilteredProducts(
                    filteredProducts.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
                )
        }
    }, [products, category, filters])


    // console.log("FILTERED PRODUCTS: ", filteredProducts);


    useEffect(() => {
        if(sort === 'newest'){
            setFilteredProducts((prev) => [...prev].sort((a,b)=> a.createdAt - b.createdAt));
        }
        else if(sort === 'asc'){
            setFilteredProducts((prev) => [...prev].sort((a,b)=> a.price - b.price));
        }
        else{
            setFilteredProducts((prev) => [...prev].sort((a,b)=>  b.price - a.price));
        }
    }, [sort])

    return (
        <>
            {/* <h3 className="products-heading">POPULAR PRODUCTS</h3> */}
            <div className="products-container">
                
                {
                    category ? 
                        ( filteredProducts.length > 0   ? 
                            filteredProducts.map((product) => <Product key={product._id} product={product} />) : 
                            <h2 style={{margin:"20px"}}>No items found</h2> 
                        )
                    :
                        ((filters||(search?.length > 0))   ? 
                            (
                                filteredProducts.length > 0   ? 
                                  filteredProducts.map((product) => <Product key={product._id} product={product} />) :
                                  <h2 style={{margin:"20px"}}>No items found</h2> 
                            ) :
                            products.slice(0, 8).map((product) => <Product key={product._id} product={product} />)
                        )
                }
            </div>
        </>
    )
}

export default Products
