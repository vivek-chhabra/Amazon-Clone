import React from "react";
import "./Cart.css";
import { auth } from "../../firebase/config";
import { ErrorMsg } from "../../helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubTotal from "../../components/SubTotal";

export default function Cart() {
    const { state } = useLocation();
    const { document, cartErr } = state;
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="Cart">
            {/* {cartErr && <ErrorMsg error={cartErr} />} */}
            {!document.length === 0 ? (
                <div className="empty-cart">
                    <div className="head">Your Amazon Cart is empty.</div>
                    <div className="cart-msg">
                        Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more. Continue shopping on the{" "}
                        <span className="pointer" style={{ color: "#0C788A" }} onClick={() => navigate("/")}>
                            Amazon.com homepage
                        </span>
                        , learn about{" "}
                        <span style={{ color: "#0C788A" }} className="pointer">
                            today's deals
                        </span>
                        , or visit your{" "}
                        <span className="pointer" style={{ color: "#0C788A" }}>
                            Wish List
                        </span>
                        .
                    </div>
                </div>
            ) : (
                <div className="item-added flex">
                    <div className="item flex pointer" onClick={() => navigate(`/product/${id}`)}>
                        <img src={"https://m.media-amazon.com/images/I/61kMfdieD+L._AC_AA300_.jpg"} alt="" />
                        <div className="add flex">
                            <i class="fa-solid fa-check"></i>
                            <p style={{ fontSize: "150%" }}>Added to Cart</p>
                        </div>
                    </div>
                    {/* <div className="total flex-column">
                        <div className="subtotal flex">
                            Cart Subtotal : <span style={{left: '6px', top: '1px'}}>INR</span>500
                            {document.reduce((acc, curr) => acc + curr.pPrice, 0)}
                        </div>
                        <div className="proceed pointer">
                            Proceed to Checkout ({document.length} {document.length > 1 ? "items" : "item"})
                        </div>
                        <div className="go-to-cart pointer">Go to Cart</div>
                    </div> */}
                    <SubTotal document={document} />
                </div>
            )}
        </div>
    );
}
