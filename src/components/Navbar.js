import { AuthContext } from "../context/AuthContext";
import logo from "../assets/PngItem_12080.png";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config";
import React, { useContext } from "react";
import "./Navbar.css";
import { useLogOut } from "../hooks/useLogOut";
import { ErrorMsg, PrimaryMsg } from "../helpers";
import { useCollection } from "../hooks/useCollection";

// categories array
const categories = ["All", "Arts and Crafts", "Automative", "Beauty and Care", "Books", "Boys Fashion", "Computers", "Deals", "Degital Computer", "Girls Fashion", "Body", "Electronics", "Mens Fashion"];

export default function Navbar() {
    // authContext
    const { user } = useContext(AuthContext);

    // useLogOut hook
    const { error, isPending, logOut } = useLogOut();

    // handeling logout
    const handleLogout = () => {
        logOut();
    };

    const { document, error: collErr } = useCollection("users");

    return (
        <>
            <div className="Navbar flex">
                <NavLink to={"/"}>
                    <img src={logo} alt="" />
                </NavLink>
                <form className="search flex">
                    <select name="" placeholder="All" id="categories">
                        {categories.map((cate) => (
                            <option value={cate.toLowerCase()}>{cate}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Search Amazon.in" className="search-box" />
                    <div className="icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </form>
                <div className="links flex">
                    {user ? (
                        <NavLink className={"link"}>
                            <span className="small-text">Hello, {user.displayName.split(' ')[0]}</span>
                            <span className="big-text">Accounts & Lists</span>
                        </NavLink>
                    ) : (
                        <NavLink to={"/signin"} className={"link"}>
                            <span className="small-text">Hello, sign in</span>
                            <span className="big-text">Accounts & Lists</span>
                        </NavLink>
                    )}
                    <NavLink to={"/"} className={"link"}>
                        <span className="small-text">Returns</span>
                        <span className="big-text">& Orders</span>
                    </NavLink>
                    <NavLink to={"/"} className={"link"}>
                        <span className="small-text">Your</span>
                        <span className="big-text">Prime</span>
                    </NavLink>
                    <NavLink to={"/add-product"} className={"link"}>
                        <span className="small-text">Sell</span>
                        <span className="big-text">Product</span>
                    </NavLink>
                    {user &&
                        (isPending ? (
                            <NavLink className={"link"}>
                                <span className="big-text" style={{ marginTop: "15px" }}>
                                    Logging Out...
                                </span>
                            </NavLink>
                        ) : (
                            <NavLink className={"link"} onClick={handleLogout}>
                                <span className="big-text" style={{ marginTop: "15px" }}>
                                    Sign Out
                                </span>
                            </NavLink>
                        ))}
                    <NavLink to={"/cart"} className={"cart"}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className="no-of-items">3</div>
                    </NavLink>
                </div>
            </div>
            {error && <ErrorMsg error={error} />}
        </>
    );
}
