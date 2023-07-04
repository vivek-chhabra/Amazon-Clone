import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <div className="Footer flex-column">
            <div className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
                Back To Top
            </div>
            <div className="links flex">
                <div className="container flex">
                    <div className="col flex-column" id="col-1">
                        <div className="head">Get to Know Us</div>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>Press Releases</p>
                        <p>Amazon Science</p>
                    </div>
                    <div className="col flex-column" id="col-2">
                        <div className="head">Connect with Us</div>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>
                    <div className="col flex-column" id="col-3">
                        <div className="head">Make Money with Us</div>
                        <p>Sell on Amazon</p>
                        <p>Sell under Amazon Accelerator</p>
                        <p>Protect and Build Your Brand</p>
                        <p>Amazon Global Selling</p>
                        <p>Become an Affiliate</p>
                        <p>Fulfilment by Amazon</p>
                        <p>Advertise Your Products</p>
                        <p>Amazon Pay on Merchants</p>
                    </div>
                    <div className="col flex-column" id="col-4">
                        <div className="head">Let Us Help You</div>
                        <p>COVID-19 and Amazon</p>
                        <p>Your Account</p>
                        <p>Returns Centre</p>
                        <p>100% Purchase Protection</p>
                        <p>Amazon App Download</p>
                        <p>Help</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="countries flex-column">
                <img src="http://localhost:3000/static/media/PngItem_12080.64a0d895e5f0098d5422.png" alt="" />
                <div className="links flex">
                    <p>Australia</p>
                    <p>Brazil</p>
                    <p>Canada</p>
                    <p>China</p>
                    <p>France</p>
                    <p>Italy</p>
                    <p>Japan</p>
                    <p>Mexico</p>
                    <p>Netherlands</p>
                    <p>Poland</p>
                    <p>Singapore</p>
                    <p>Spain</p>
                    <p>Turkey</p>
                    <p>United Arab Emirates</p>
                    <p>United Kingdom</p>
                    <p>United States</p>
                </div>
            </div>
            <div className="additional-links flex">
                <div className="container flex">
                    <div className="col flex-column" id="col-1">
                        <p>AbeBooks</p>
                        <span>Books, art</span>
                        <span>& collectibles</span>
                    </div>
                    <div className="col flex-column" id="col-2">
                        <p>Amazon Web Services</p>
                        <span>Scalable Cloud</span>
                        <span>Computing Services</span>
                    </div>
                    <div className="col flex-column" id="col-3">
                        <p>Audible</p>
                        <span>Download</span>
                        <span>Audio Books</span>
                    </div>
                    <div className="col flex-column" id="col-4">
                        <p>DPReview</p>
                        <span>Digital</span>
                        <span>Photography</span>
                    </div>
                    <div className="col flex-column" id="col-5">
                        <p>IMDb</p>
                        <span>Movies, TV</span>
                        <span>& Celebrities</span>
                    </div>
                    <div className="col flex-column" id="col-6">
                        <p>Shopbop</p>
                        <span>Designer</span>
                        <span>Fashion Brands</span>
                    </div>
                    <div className="col flex-column" id="col-7">
                        <p>Amazon Business</p>
                        <span>Everything For</span>
                        <span>Your Business</span>
                    </div>
                    <div className="col flex-column" id="col-8">
                        <p>Prime Now</p>
                        <span>2-Hour Delivery</span>
                        <span>on Everyday Items</span>
                    </div>
                    <div className="col flex-column" id="col-9">
                        <p>Amazon Prime Music</p>
                        <span>100 million songs, ad-free</span>
                        <span>Over 15 million podcast episodes</span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="links flex">
                    <p>Conditions of Use & Sale</p>
                    <p>Privacy Notice</p>
                    <p>Interest-Based Ads</p>
                </div>
                © 1996-2023, Amazon.com, Inc. or its affiliates
            </div>
        </div>
    );
}
