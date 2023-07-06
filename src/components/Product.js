import { NavLink, useNavigate } from "react-router-dom";
import { randNum } from "../helpers";
import React from "react";
import "./Product.css";

export default function Product({ productInfo }) {
    const navigate = useNavigate();

    return (
        <div className="Product col flex-column" onClick={() => navigate(`/product/${productInfo.id}`, { state: productInfo })} id="col-2">
            <div className="single-img">
                <img src={productInfo.pImage[0]} alt="" />
            </div>
            <p className="head">
                {productInfo.pDiscription.slice(0, 55)}
                ...
            </p>
            <div className="rating flex" style={{marginBottom: '5px'}}>
                <div className="stars flex">
                    <box-icon type="solid" color="#FFAA42" name="star"></box-icon>
                    <box-icon type="solid" color="#FFAA42" name="star"></box-icon>
                    <box-icon type="solid" color="#FFAA42" name="star"></box-icon>
                    <box-icon name="star-half" color="#FFAA42" type="solid"></box-icon>
                    <box-icon name="star" color="#FFAA42"></box-icon>
                </div>
                <p>{productInfo.ratings} ratings.</p>
            </div>
            <div className="deal flex">
                <div className="off">{productInfo.percentOff}% off </div>
                <p>Deal</p>
            </div>
            <div className="price">
                <box-icon name="rupee"></box-icon>
                <span>{productInfo.pPrice}</span>
                <span className="list-p">
                    List Price : <b style={{ textDecoration: "line-through" }}>INR {((productInfo.pPrice * 100) / (100 - productInfo.percentOff)).toFixed(2)}</b>
                </span>
            </div>
            <div className="duration">get the product within {productInfo.pDeliveryDur} days</div>
        </div>
    );
}
