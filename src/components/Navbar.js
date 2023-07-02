import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

import logo from "../assets/PngItem_12080.png";

const categories = ["All", "Arts and Crafts", "Automative", "Beauty and Care", "Books", "Boys Fashion", "Computers", "Deals", "Degital Computer", "Girls Fashion", "Body", "Electronics", "Mens Fashion"];

export default function Navbar() {
    return (
        <div className="Navbar flex">
            <img src={logo} alt="" />
            <form className="search flex">
                <select name="" placeholder="All" id="categories">
                    {categories.map((cate) => (
                        <option value={cate.toLowerCase()}>{cate}</option>
                    ))}
                </select>
                <input type="text" className="search-box" />
                <div className="icon">
                <i class="fa-solid fa-magnifying-glass"></i>
                </div>
            </form>
            <div className="links flex">
                <NavLink to={"/login"}>
                    <span className="small-text">Hello, sign in</span>
                    <span className="big-text">Accounts & Lists</span>
                </NavLink>
                <NavLink to={"/login"}>
                    <span className="small-text">Returns</span>
                    <span className="big-text">& Orders</span>
                </NavLink>
                <NavLink to={"/cart"} className={'cart'}>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <div className="no-of-items">3</div>
                </NavLink>
            </div>
        </div>
    );
}
