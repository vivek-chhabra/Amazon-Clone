import { NavLink, useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useState } from "react";
import { ErrorMsg, PrimaryMsg } from "../helpers";
import logo from "../assets/PngItem_12080.png";
import { useLogOut } from "../hooks/useLogOut";
import { auth } from "../firebase/config";
import "./Navbar.css";

// categories array
const categories = ["All", "Arts and Crafts", "Automative", "Beauty and Care", "Books", "Boys Fashion", "Computers", "Deals", "Degital Computer", "Girls Fashion", "Body", "Electronics", "Mens Fashion"];

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const [query, setQuery] = useState("");

    const { error, isPending, logOut } = useLogOut();

    const navigate = useNavigate();
    const { error: cartErr, document } = useCollection(`cart`, `uid`, `${auth?.currentUser?.uid}`);
    const { document: prodDocs } = useCollection("products");

    const handleLogout = async () => {
        await logOut();
        navigate("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const queriedItems =
        query === ""
            ? []
            : prodDocs
                  ?.map((item) => {
                      return { noSpace: item.pDiscription.toLowerCase().replace(/\s/g, ""), product: item };
                  })
                  .filter((item) => item.noSpace.includes(query.toLowerCase().replace(/\s/g, "")));

    const handleNavigate = (item) => {
        navigate(`/product/${item.product.id}`, { state: item.product });
        setQuery("");
    };

    return (
        <>
            <div className="Navbar flex">
                <NavLink to={"/"}>
                    <img src={logo} alt="" />
                </NavLink>
                <form className="search flex" onSubmit={handleSearch}>
                    <select name="" placeholder="All" id="categories">
                        {categories.map((cate) => (
                            <option value={cate.toLowerCase()}>{cate}</option>
                        ))}
                    </select>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Amazon.in" className="search-box" />
                    <button className="icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    {query && (
                        <div className="query-items">
                            {queriedItems.map((item) => (
                                <div className="item" onClick={() => handleNavigate(item)}>
                                    {item.product.pDiscription}
                                </div>
                            ))}
                        </div>
                    )}
                </form>
                <div className="links flex">
                    {user ? (
                        <NavLink className={"link"}>
                            <span className="small-text">Hello, {user.displayName.split(" ")[0]}</span>
                            <span className="big-text">Accounts & Lists</span>
                        </NavLink>
                    ) : (
                        <NavLink to={"/signin"} className={"link"}>
                            <span className="small-text">Hello, sign in</span>
                            <span className="big-text">Accounts & Lists</span>
                        </NavLink>
                    )}
                    <NavLink to={"/yourorders"} className={"link"}>
                        <span className="small-text">Returns</span>
                        <span className="big-text">& Orders</span>
                    </NavLink>
                    {user && (
                        <NavLink to={"/add-product"} className={"link"}>
                            <span className="small-text">Sell</span>
                            <span className="big-text">Product</span>
                        </NavLink>
                    )}
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
                    <div onClick={() => navigate("/cart", { state: { document, cartErr } })} className={"cart pointer"}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className="no-of-items">{document.reduce((acc, curr) => acc + +curr.pQty, 0)}</div>
                    </div>
                </div>
            </div>
            {error && <ErrorMsg error={error} />}
        </>
    );
}
