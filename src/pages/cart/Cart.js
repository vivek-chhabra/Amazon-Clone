import { useLocation, useNavigate, useParams } from "react-router-dom";
import Recommendation from "../../components/Recommendation";
import { useCollection } from "../../hooks/useCollection";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../components/CartItem";
import SubTotal from "../../components/SubTotal";
import Footer from "../../components/Footer";
import { auth } from "../../firebase/config";
import { ErrorMsg } from "../../helpers";
import "./Cart.css";

export default function Cart() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { cartErr, document } = useCollection("cart", `uid`, `${auth?.currentUser?.uid}`);
    const { user } = useContext(AuthContext);
    const [latest, setLatest] = useState(null); 

    useEffect(() => {
        if (document.length > 0) {
            if (document.length === 1) {
                setLatest(document[0]);
            } else {
                let item = document.reduce((acc, curr) => {
                    latest = acc;
                    if (acc.createdAt.seconds < curr.createdAt.seconds) {
                        latest = curr;
                    }
                    return latest;
                });
                setLatest(item);
            }
        }
    }, [document]);

    console.log(latest);

    if (state) {
        var { productAdded } = state;
    }

    return (
        <>
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
                            <div className={productAdded !== undefined ? "item flex pointer" : "item flex"} onClick={() => navigate(`/product/${latest.productInfo.id}`, { state: latest.productInfo })}>
                                {latest && <img className="pointer" src={latest.pImage} alt="" />}
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
            {!user && <Recommendation />}
            <Footer />
        </>
    );
}
