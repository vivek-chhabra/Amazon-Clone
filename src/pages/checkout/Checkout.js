import { ErrorMsg, PrimaryMsg, SuccessMsg, currencyFormat, numDivisibleBy, randNum } from "../../helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import React, { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import "./Checkout.css";

export default function Checkout() {
    // useInput hook
    const [expirationDate, updateExpirationDate] = useInput("");
    const [securityCode, updateSecurityCode] = useInput("");
    const [address, updateAddress] = useInput("");
    const [formErr, setFormErr] = useState(null);
    const [cardNo, updateCardNo] = useInput("");
    const [name, updateName] = useInput("");

    const { state } = useLocation();
    const navigate = useNavigate();

    // product summery info
    const shippingChrgs = numDivisibleBy(100, 40, 10);
    const items = state.reduce((acc, curr) => acc + +curr.pQty, 0);
    const totalVal = state.reduce((acc, curr) => acc + +curr.pPrice * +curr.pQty, 0);
    const taxVal = randNum(400, 100);

    // useFirestore
    const { response, addDocument, deleteDocument } = useFirestore();
    const { error, isPending, success } = response;

    const checkout = {
        checkoutInfo: {
            name,
            taxVal,
            cardNo,
            address,
            expirationDate,
            numberOfItems: items,
            shippingCharges: shippingChrgs,
            totalPmt: totalVal + taxVal + shippingChrgs,
        },
        itemsInfo: state,
    };

    // submission of the order
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErr(null);

        if (cardNo.length > 16 || cardNo.length < 16) {
            setFormErr("Length of card number must be the 16 digits");
            window.scrollTo(0, 0);
            return;
        } else if (securityCode.length > 3 || securityCode.length < 3) {
            setFormErr("Length of CVV number must be the 3 digits");
            window.scrollTo(0, 0);
            return;
        } else if (typeof +cardNo !== "number") {
            setFormErr("Card number should only contain the value of type number");
            window.scrollTo(0, 0);
            return;
        }
        await addDocument("checkoutInfo", checkout);
    };

    useEffect(() => {
        if (success) {
            checkout.itemsInfo.forEach(async (item) => {
                await deleteDocument("cart", item.id);
            });
            navigate("/orderplaced");
        }
    }, [success]);

    return (
        <div className="Checkout flex-column">
            {formErr && <ErrorMsg error={formErr} />}
            {isPending && <PrimaryMsg msg={"Placing Your Order..."} />}

            <div className="container">
                <div className="head">
                    Checkout{" "}
                    <span className="pointer" style={{ color: "#007084" }}>
                        ( {items} {items > 1 ? "items" : "item"} )
                    </span>
                </div>
                <div className="checkout-details flex">
                    <div className="left-section flex">
                        <form className="flex-column" onSubmit={handleSubmit} style={error ? { marginTop: "30px" } : { marginTop: "0px" }}>
                            <h2 className="Form-head">Fill out the Fields Below</h2>
                            <div className="address-sec flex-column">
                                <h4>
                                    <span>1</span>Shippment Address
                                </h4>
                                <div className="address" id="row-2">
                                    <label htmlFor="floatingTextarea2">Delivery Address :</label>
                                    <div className="form-floating">
                                        <textarea required className="form-control shadow-none" value={address} onChange={updateAddress} id="floatingTextarea2" style={{ height: "70px" }}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="payment-sec flex-column">
                                <h4>
                                    <span>2</span>Payment Information
                                </h4>
                                <div className="payment flex-column">
                                    <div className="mb-0">
                                        <label htmlFor="card-no" className="form-label">
                                            Card Number :
                                        </label>
                                        <input type="text" placeholder="1234 1234 1234 1234" required value={cardNo} onChange={updateCardNo} className="shadow-none form-control" id="card-no" />
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="name" className="form-label">
                                            Name On Card :
                                        </label>
                                        <input type="text" required value={name} onChange={updateName} className="shadow-none form-control" id="name" />
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="expiry" className="form-label">
                                            Expiration Date :
                                        </label>
                                        <input type="text" required placeholder="MM-YYYY" value={expirationDate} onChange={updateExpirationDate} className="shadow-none form-control" id="expiry" />
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="security" className="form-label">
                                            Security Code (CVV) :
                                        </label>
                                        <input type="number" required min={0} max={999} value={securityCode} onChange={updateSecurityCode} className="shadow-none form-control" id="security" />
                                    </div>
                                </div>
                            </div>
                            {isPending ? (
                                <button type="submit" disabled className="btn btn-primary">
                                    Loading...
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary">
                                    Place the Order
                                </button>
                            )}
                        </form>
                    </div>
                    <div className="right-section flex-column">
                        <div className="top flex-column">
                            <div className="head">Order Summary</div>
                            <small className="flex">
                                <div className="span">items ({items}) :</div>
                                <span>{currencyFormat(totalVal)}</span>
                            </small>
                            <small className="flex">
                                <div className="span">Shipping & handling :</div>
                                <span>{currencyFormat(shippingChrgs)}</span>
                            </small>
                            <div className="hr"></div>
                            <small className="flex">
                                <div className="span">Total before tax : </div>
                                <span>{currencyFormat(totalVal + shippingChrgs)}</span>
                            </small>
                            <small className="flex">
                                <div className="span">Estimated tax to be collected : </div>
                                <span>{currencyFormat(taxVal)}</span>
                            </small>
                            <div className="hr-2 hr"></div>
                            <div className="total">
                                <span>Payment Total : </span> <span>{currencyFormat(totalVal + shippingChrgs + taxVal)}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            <small>
                                You can track your shipment and view any applicable import fees deposit before placing your order.{" "}
                                <span className="pointer" style={{ color: "#007084" }}>
                                    Learn more
                                </span>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
