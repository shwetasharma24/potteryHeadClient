import React, { useState } from 'react';
import "../styles/productList.css";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'; 


const ProductList = () => {

    const location = useLocation();
    const category = location?.pathname?.split("/")[2] || null;
    const [search, setSearch] = useState("");
    const [input, setInput] = useState("");
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");


    const handleSearch = () => {
        setSearch(input);
    }


    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters( { ...filters, [e.target.name] : value } );
    }


    return (
        <div className="product-list-container">
            <Navbar />
            <Announcement />
            <h2 className="product-list-title"> {category ? category.toUpperCase().replace('%20', ' ') : ""} </h2>
            <div className="product-list-filter-container">

            
                <div className="product-list-filter">
                   <div className="product-list-search-container">
                       <input className="product-list-input" placeholder="Search" onChange={(e) => setInput(e.target.value)} /> 
                       <SearchOutlinedIcon style={{ fontSize:16, cursor:"pointer" }}  onClick={handleSearch} />
                   </div>
                </div>  
                

                <div className="product-list-filter"> 
                    <span className="product-list-filter-text"> Filters: </span> 

                    <select name="color" id="color" className="product-list-select" onChange={handleFilters}>
                        <option value="color" className="product-list-option" disabled > color </option>
                        <option value="blue" className="product-list-option"> blue </option>
                        <option value="brown" className="product-list-option"> brown </option>
                        <option value="black" className="product-list-option"> black </option>
                    </select>  

                    <select name="material" id="material" className="product-list-select" onChange={handleFilters}>
                        <option value="material" className="product-list-option" disabled > material </option>
                        <option value="organic clay" className="product-list-option">  organic clay </option>
                        <option value="terracotta clay" className="product-list-option">  terracotta clay </option>
                        <option value="ceramic" className="product-list-option"> ceramic </option>
                        <option value="metal" className="product-list-option"> metal </option>
                    </select>  
                
                </div>

                <div className="product-list-filter"> 
                    <span className="product-list-filter-text"> Sort: </span> 
                
                    <select className="product-list-select" name="sort" id="sort" onChange = { e => setSort(e.target.value)}>
                        <option value="newest" className="product-list-option"> Newest </option>
                        <option value="asc" className="product-list-option"> Price (asc) </option>
                        <option value="desc" className="product-list-option"> Price (desc) </option>
                    </select>

                </div>
            </div>

            { category  ?  <Products category={category} search={search} filters={filters} sort={sort} />  :  <Products search={search} filters={filters} sort={sort} />}
            <Newsletter />
            <Footer />

        </div>
    )
}

export default ProductList
