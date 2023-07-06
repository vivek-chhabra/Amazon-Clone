import React from "react";
import "./Cart.css";
import { auth } from "../../firebase/config";
import { ErrorMsg } from "../../helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubTotal from "../../components/SubTotal";
import CartItem from "../../components/CartItem";
import { useCollection } from "../../hooks/useCollection";

export default function Cart() {
    const { state } = useLocation();
    const { photoURL, productAdded } = state;
    const navigate = useNavigate();
    const { id } = useParams();
    const { cartErr, document } = useCollection("cart", `uid`, `${auth?.currentUser?.uid}`);

    return (
        <div className="Cart flex-column">
            {cartErr && <ErrorMsg error={cartErr} />}
            {document.length === 0 ? (
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
                <>
                    <div className="item-added flex">
                        <div className="item flex pointer" onClick={() => navigate(`/product/${productAdded.id}`, { state: productAdded })}>
                            <img src={photoURL} alt="" />
                            <div className="add flex">
                                <i class="fa-solid fa-check"></i>
                                <p style={{ fontSize: "150%" }}>Added to Cart</p>
                            </div>
                        </div>
                        <SubTotal document={document} />
                    </div>
                    <div className="cart-items flex-column" style={{ gap: "20px" }}>
                        {document.map((doc) => {
                            return <CartItem document={doc} />;
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
