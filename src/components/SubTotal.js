import { useNavigate } from "react-router-dom";
import "./SubTotal.css";
import React from "react";

export default function SubTotal({ document }) {
    const navigate = useNavigate();
    return (
        <div className="total flex-column">
            <div className="subtotal flex">
                Cart Subtotal : <span style={{ left: "6px", top: "1px" }}>INR</span>
                {document.reduce((acc, curr) => acc + curr.pPrice * curr.pQty, 0)}
            </div>
            <div className="proceed pointer">Proceed to Checkout ( {(document.reduce((acc, curr) => acc + +curr.pQty, 0))} {document.length > 1 ? "items" : "item"} )</div>
        </div>
    );
}
