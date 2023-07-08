import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../helpers";
import React from "react";
import "./SubTotal.css";

export default function SubTotal({ document }) {
    const navigate = useNavigate();
    return (
        <div className="total flex-column">
            <div className="subtotal flex">Cart Subtotal : {currencyFormat(document.reduce((acc, curr) => acc + curr.pPrice * curr.pQty, 0))}</div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input shadow-none" id="gift" />
                <label className="form-check-label " htmlFor="gift">
                    This order contains a gift
                </label>
            </div>
            <div className="proceed pointer" onClick={() => navigate("/checkout", { state: document })}>
                Proceed to Checkout ( {document.reduce((acc, curr) => acc + +curr.pQty, 0)} {document.length > 1 ? "items" : "item"} )
            </div>
        </div>
    );
}
