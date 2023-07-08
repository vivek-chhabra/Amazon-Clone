import { ErrorMsg, PrimaryMsg, currencyFormat, removeEle } from "../../helpers";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import React, { useEffect } from "react";
import "./YourOrders.css";

export default function YourOrders() {
    const navigate = useNavigate();

    // useCollection hook
    const { error, document } = useCollection("checkoutInfo", `uid`, `${auth?.currentUser?.uid}`);

    // useFirestore hook
    const { response, editDocument, deleteDocument } = useFirestore();
    console.log(document);

    const handleEdit = async (idx1, idx2) => {
        let array = document[idx1].itemsInfo;
        let newArray = removeEle(array, idx2);
        await editDocument("checkoutInfo", { itemsInfo: newArray }, document[idx1].id);
    };

    useEffect(() => {
        document.forEach((ele, idx) => {
            if (ele.itemsInfo.length === 0) {
                deleteDocument("checkoutInfo", ele.id);
            }
        });
    }, [document]);


    return (
        <div className="YourOrders flex-column" style={document.every((ele) => ele.itemsInfo.length === 0) ? { height: "100vh" } : { minHeight: "100vh" }}>
            {document.every((ele) => ele.itemsInfo.length === 0) ? (
                <div className="empty-cart">
                    <div className="head">Get Started on Your Shopping Journey!</div>
                    <div className="cart-msg">Welcome to your Orders page! It's currently empty, but don't worry! Explore our wide range of products and add them to your cart. Our friendly support team is here to assist you. Let's start your shopping journey together!</div>
                </div>
            ) : (
                <div className="container">
                    {error && <ErrorMsg error={error} />}
                    <div className="top-head">Orders Details</div>
                    {document.map((doc, idx1) => {
                        return doc.itemsInfo.map((ele, idx2) => {
                            return (
                                <>
                                    <div className="orders flex-column">
                                        <div className="order flex-column">
                                            <div className="top flex">
                                                <div className="left flex">
                                                    <div className="placed-at flex-column">
                                                        ORDER PLACED ON <span>{doc.createdAtDate}</span>
                                                    </div>
                                                    <div className="total-amt flex-column">
                                                        TOTAL <span>{currencyFormat(ele.pPrice * ele.pQty)}</span>
                                                    </div>
                                                    <div className="ship-to flex-column">
                                                        SHIP TO <span>{auth?.currentUser?.displayName}</span>
                                                    </div>
                                                </div>
                                                <div className="right flex-column">
                                                    <div className="order-id flex-column">
                                                        ORDER ID # <span>{doc.id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="middle flex">
                                                <div className="left flex-column">
                                                    <div className="head">Arriving after {ele.productInfo.pDeliveryDur} days</div>
                                                    <div className="dispatch" style={{ color: "#007E60", fontWeight: "600", marginBottom: "30px", fontSize: "90%" }}>
                                                        Not Yet Dispatched
                                                    </div>
                                                    <div className="item flex">
                                                        <div className="img pointer" onClick={() => navigate(`/product/${ele.productId}`, { state: ele.productInfo })}>
                                                            <img src={ele.pImage} alt="" />
                                                        </div>
                                                        <div className="item-info flex-column">
                                                            <div className="item-name pointer" style={{ color: "#017085" }} onClick={() => navigate(`/product/${ele.productId}`, { state: ele.productInfo })}>
                                                                {ele.productInfo.pDiscription
                                                                    .split(" ")
                                                                    .map((word) => word + " ")
                                                                    .slice(0, 15)}
                                                                . . .
                                                            </div>
                                                            <div className="units" style={{ fontSize: "90%", marginTop: "15px" }}>
                                                                Units : {ele.pQty}U
                                                            </div>
                                                            <div className="price" style={{ fontSize: "90%" }}>
                                                                Price : {currencyFormat(ele.pPrice)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right flex-column">
                                                    <div className="track">Track Package</div>
                                                    <div className="edit cursor-default">View of Edit Order</div>
                                                    <div className="delete" onClick={() => handleEdit(idx1, idx2)}>
                                                        Cancel This Item
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-bottom flex">
                                                <div className="left flex-column">
                                                    <b style={{ color: "#017085" }} className="">
                                                        Archive Order
                                                    </b>
                                                    <div className="address flex">
                                                        <div style={{ fontWeight: "800" }}>Shippment Address :</div>
                                                        <b className="add" style={{ marginLeft: "5px" }}>
                                                            {doc.checkoutInfo.address}
                                                        </b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        });
                    })}
                </div>
            )}
        </div>
    );
}
