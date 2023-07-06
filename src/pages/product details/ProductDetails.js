import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import React, { useState } from "react";
import { ErrorMsg, capitalize, numDivisibleBy, randNum } from "../../helpers";
import { useInput } from "../../hooks/useInput";
import { useFirestore } from "../../hooks/useFirestore";
import { auth } from "../../firebase/config";
import { useCollection } from "../../hooks/useCollection";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [imgIdx, setImgIdx] = useState(0);
    const [error, setError] = useState(null);

    // useInput hook
    const [quantity, setQuantity] = useInput(1);

    // useFirestore hook
    const { response, addDocument } = useFirestore();

    // cart object
    const cartItem = {
        pName: state.pName,
        pDiscription: state.pDiscription,
        pImage: state.pImage[0],
        pPrice: +state.pPrice,
        pQty: quantity,
        productInfo: state,
        productId: state.id,
        actualPrice: ((state.pPrice * 100) / (100 - state.percentOff)).toFixed(2),
        percentOff: state.percentOff,
        createdBy: {
            name: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            photoUrl: auth?.currentUser?.photoURL,
            uid: auth?.currentUser?.uid,
        },
        uid: auth?.currentUser?.uid,
    };

    // useCollection hook
    const { error: cartErr, document } = useCollection(`cart`, `uid`, `${auth?.currentUser?.uid}`);

    // adding item to the cart
    const AddToCart = () => {
        for (let i = 0; i < document.length; i++) {
            if (state.pName === document[i].pName) {
                setError("Item is Already Available in the Cart");
                window.scrollTo(0, 0);
                return;
            }
        }
        addDocument("cart", cartItem);
        navigate("/cart", { state: { photoURL: state.pImage[0], productAdded: state } });
    };

    return (
        <div className="flex-column" style={{ backgroundColor: "white" }}>
            {error && <ErrorMsg error={error} />}
            <div className="ProductDetails flex">
                <div className="left-seciton flex-column">
                    <div className="bigImage">
                        <img src={state.pImage[imgIdx]} alt="" />
                    </div>
                    <div className="images flex">
                        {state.pImage.map((img, idx) => {
                            return <img onClick={() => setImgIdx(idx)} style={idx === imgIdx ? { outline: "solid #579fb3b4", border: "none" } : { outline: "" }} src={img} alt="product-image" />;
                        })}
                    </div>
                </div>
                <div className="right-section flex-column">
                    <div className="top flex-column">
                        <div className="discription">{state.pDiscription}</div>
                        <div className="link pointer">Visit the {capitalize(state.pBrand)} Store</div>
                        <div className="rating flex">
                            <div className="start flex">
                                <box-icon type="solid" color="#FFAA42" name="star"></box-icon>
                                <box-icon type="solid" color="#FFAA42" name="star"></box-icon>
                                <box-icon type="solid" color="#FFAA42" name="star"></box-icon>
                                <box-icon name="star-half" color="#FFAA42" type="solid"></box-icon>
                                <box-icon name="star" color="#FFAA42"></box-icon>
                            </div>
                            <p className="pointer">{state.ratings} ratings</p>
                        </div>
                    </div>
                    <div className="middle flex-column">
                        <hr />
                        <div className="row" id="row-1">
                            <div className="price flex">
                                <div>-{state.percentOff}%</div> <span style={{ fontSize: "60%", fontWeight: "600", bottom: "5px" }}>INR</span>
                                <p>{state.pPrice}</p>
                            </div>
                            <div className="original-price flex">
                                Typical Price : <span>INR {((state.pPrice * 100) / (100 - state.percentOff)).toFixed(2)}</span>
                            </div>
                            <div className="shipping-charge">INR {+state.pPrice + +numDivisibleBy(100, 40, 10)} is the effective amount after including shipping charges and GST</div>
                            <div className="btns flex">
                                <select name="" id="" value={quantity} onChange={setQuantity} className="qty">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((qty) => (
                                        <option value={qty}>{qty}</option>
                                    ))}
                                </select>
                                <button className="add-to-cart" onClick={AddToCart}>
                                    Add to Cart
                                </button>
                                <button className="buy">Buy Now</button>
                            </div>
                            <div className="units-left">Only {randNum(20, 5)} units are left in stock - order soon</div>
                        </div>
                        <hr />
                        <div className="row flex-column" id="row-2">
                            <div className="head">Delivery and Support</div>
                            <div className="select">select to learn more</div>
                            <div className="links flex">
                                <div className="col flex-column" style={{ width: "100px" }} id="col-1">
                                    <img src="https://m.media-amazon.com/images/G/01/VAS/TrustWidget/ShipByAmz._CB611763802_.png" alt="" />
                                    <div className="pointer" style={{ color: "#004f5f" }}>
                                        Ships from Amazon.com
                                    </div>
                                </div>
                                <div className="col flex-column" style={{ width: "100px" }} id="col-2">
                                    <img src="https://m.media-amazon.com/images/G/01/VAS/TrustWidget/ReturnsYes._CB611763802_.png" alt="" />
                                    <div className="pointer" style={{ color: "#004f5f" }}>
                                        Eligible for Return, Refund or Replacement within 30 days of receipt
                                    </div>
                                </div>
                                <div className="col flex-column" style={{ width: "100px" }} id="col-3">
                                    <img src="https://m.media-amazon.com/images/G/01/VAS/TrustWidget/CustomerSupport._CB631535167_.png" alt="" />
                                    <div className="pointer" style={{ color: "#004f5f" }}>
                                        Customer Support
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="bottom flex-column">
                        <div className="row flex-column" id="row-1">
                            <div className="head" style={{ fontSize: "130%", fontWeight: "400" }}>
                                Available at a lower price from{" "}
                                <span className="pointer" style={{ color: "#004F5F", fontWeight: "600" }}>
                                    other sellers
                                </span>{" "}
                                that may not offer free Prime shipping.
                            </div>
                            <div className="product-info flex-column">
                                <div className="item flex" id="item-1">
                                    <b>Brand</b>
                                    <span>{state.pBrand}</span>
                                </div>
                                <div className="item flex" id="item-2">
                                    <b>Color</b>
                                    <span>{state.pColor}</span>
                                </div>
                                <div className="item flex" id="item-3">
                                    <b>Delivery Duration</b>
                                    <span>{state.pDeliveryDur} Days</span>
                                </div>
                                <div className="item flex" id="item-4">
                                    <b>Warrenty</b>
                                    <span>{state.pWarrenty} Days</span>
                                </div>
                                <div className="item flex" id="item-5">
                                    <b>Weight</b>
                                    <span>{state.pWeight} KG</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row flex-column" id="row-2">
                            <div className="head">About this item</div>
                            <div className="product-features">
                                <ul>
                                    {state.pFeatures.map((feature) => (
                                        <li>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
