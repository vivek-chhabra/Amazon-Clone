import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Recommendation from "./Recommendation";
import { auth } from "../firebase/config";
import { ErrorMsg } from "../helpers";
import Footer from "./Footer";
import "./OrderSuccess.css";

export default function OrderSuccess() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // useFirestore hook
    const { response, deleteDocument } = useFirestore();

    // useCollection hook
    const { error, document } = useCollection("checkoutInfo", "uid", `${auth?.currentUser?.uid}`);

    if (document.length > 0) {
        var latestDoc = document.reduce((acc, curr) => {
            let latest = acc;
            if (latest.createdAt.seconds < curr.createdAt.seconds) {
                latest = curr;
            }
            return latest;
        });
    } else {
        return;
    }

    return (
        <>
            <div className="container flex-column">
                {error && <ErrorMsg error={error} />}
                {latestDoc.itemsInfo.map((doc) => {
                    return (
                        <>
                            <div className="OrderSuccess flex">
                                <div className="left-sec flex-column">
                                    <div className="confirm-msg flex">
                                        <i class="fa-solid fa-check"></i>Order Placed, Thankyou!
                                    </div>
                                    <p style={{ fontWeight: "800", marginBottom: "10px" }}>Confirmation will be sent to your email.</p>
                                    <div className="address">
                                        <div className="add">
                                            <b>Shipping to {auth?.currentUser?.displayName}, </b>
                                            {latestDoc.checkoutInfo.address}.<div className="emailAdd">, Email Address : {auth?.currentUser?.email}</div>{" "}
                                        </div>
                                    </div>
                                    <div className="hr"></div>
                                    <div className="item flex">
                                        <div className="date">
                                            <p>
                                                Order is expected to be delivered after {doc.productInfo.pDeliveryDur} days from {latestDoc.createdAtDate}
                                            </p>
                                        </div>
                                        <div className="img pointer" onClick={() => navigate(`/product/${doc.productInfo.id}`, { state: doc.productInfo })}>
                                            <img src={doc.pImage} alt="" />
                                        </div>
                                    </div>
                                    <NavLink to={"/yourorders"}>
                                        Go to your order <i class="fa-solid fa-angle-right"></i>{" "}
                                    </NavLink>
                                </div>
                                <div className="right-sec flex-column">
                                    <div className="head">
                                        Buying for work ? Register for a <b>Free Amazon Business account</b> to access <b>GST invoices, business-executive deals and bulk Discounts.</b>
                                    </div>
                                    <div className="link">Go to amazon Business</div>
                                    <img src="https://img.freepik.com/free-vector/tiny-man-ordering-products-online-via-smartphone_74855-15542.jpg?w=1060&t=st=1688719209~exp=1688719809~hmac=bd38d9757e2493854f655c3cc4a52e731c8bef29fb39a7593246380f64b48fe2" alt="" />
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
            <div className="FD flex container">
                <img src="https://m.media-amazon.com/images/G/31/img19/AmazonPay/HFC_21/MAPLE/Maple_72x72_LPA_Generic._CB653886972_.png" alt="" />
                <div className="flex-column">
                    <b>Invest in Fixed Deposits and Get upto 8.7% annual interest</b>
                    <b>*T&C apply</b>
                </div>
            </div>
            <div className="continue-button">
                <div id="continue-shop" className="pointer" onClick={() => navigate("/")}>
                    Continue Shopping
                </div>
            </div>
            {!user && <Recommendation />}
            <Footer />
        </>
    );
}
