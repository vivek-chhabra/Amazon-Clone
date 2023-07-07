import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { ErrorMsg, PrimaryMsg, currencyFormat } from "../../helpers";
import "./YourOrders.css";
import React, { useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";

export default function YourOrders() {
    const navigate = useNavigate();

    // useCollection hook
    const { error, document } = useCollection("checkoutInfo", `uid`, `${auth?.currentUser?.uid}`);

    if (document.length === 0) {
        return (
            <div className="YourOrders">
                <PrimaryMsg msg={"Fetching your orders."} />
            </div>
        );
    }

    console.log(document);

    return (
        <div className="YourOrders flex-column">
            <div className="container">
                {error && <ErrorMsg error={error} />}
                <div className="top-head">Orders Details</div>
                {document.map((doc) => {
                    return doc.itemsInfo.map((ele) => {
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
                                                <div className="delete">Cancel This Item</div>
                                            </div>
                                        </div>
                                        <div className="order-bottom flex">
                                            <b style={{ color: "#017085" }} className="">
                                                Archive Order
                                            </b>
                                            <div className="address flex-column">
                                                <div style={{ fontWeight: "800" }}>Shippment Address</div>
                                                <b className="add">{doc.checkoutInfo.address}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    });
                })}
            </div>
        </div>
    );
}
