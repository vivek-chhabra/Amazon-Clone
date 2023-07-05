import "./SubTotal.css";
import React from "react";

export default function SubTotal({ document }) {
    return (
        <div className="total flex-column">
            <div className="subtotal flex">
                Cart Subtotal : <span style={{ left: "6px", top: "1px" }}>INR</span>500
                {document.reduce((acc, curr) => acc + curr.pPrice, 0)}
            </div>
            <div className="proceed pointer">
                Proceed to Checkout ({document.length} {document.length > 1 ? "items" : "item"})
            </div>
            <div className="go-to-cart pointer">Go to Cart</div>
        </div>
    );
}
