import { useNavigate } from "react-router-dom";
import { PrimaryMsg, randNum } from "../helpers";
import { useFirestore } from "../hooks/useFirestore";
import { useInput } from "../hooks/useInput";
import "./CartItem.css";
import React, { useEffect, useState } from "react";

export default function CartItem({ document }) {
    const { response, editDocument, deleteDocument } = useFirestore();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(document.pQty);

    // handling the updation of quantity
    useEffect(() => {
        editDocument("cart", { pQty: quantity }, document.id);
    }, [quantity]);

    // deleting item here
    const handleDelete = () => {
        deleteDocument("cart", document.id);
    };

    return (
        <>
            <div className="CartItem">
                <div className="head">Shopping Cart</div>
                <hr />
                <div className="item-details flex">
                    <div className="img pointer" onClick={() => navigate(`/product/${document.productInfo.id}`, { state: document.productInfo })}>
                        <img src={document.pImage} alt="" />
                    </div>
                    <div className="details">
                        <div className="item-name">{document.pName}</div>
                        <div className="item-price flex">
                            INR {document.pPrice} {<div style={{ textDecoration: "line-through", left: "15px" }}>( {document.actualPrice} )</div>}
                        </div>
                        <p style={{ color: "#197601", fontSize: "80%", fontWeight: "600", marginBlock: "5px" }}>in stock</p>
                        <div className="units-bought">{randNum(100, 40)}+ bought in the past week</div>
                        <div className="edit-cart flex">
                            <select name="" id="" className="qty" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((qty) => (
                                    <option value={qty}>{qty}</option>
                                ))}
                            </select>
                            <div className="proceed pointer">
                                Proceed to Checkout ( {quantity} {quantity > 1 ? "items" : "item"} )
                            </div>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="subTotal">
                    Subtotal ({document.pQty > 1 ? "items " : "item "}
                    {document.pQty}) : <span style={{ fontWeight: "700" }}>INR {document.pPrice * document.pQty}</span>
                </div>
            </div>
        </>
    );
}
