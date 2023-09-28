import Recommendation from "../../components/Recommendation";
import { useCollection } from "../../hooks/useCollection";
import { AuthContext } from "../../context/AuthContext";
import { ErrorMsg, PrimaryMsg } from "../../helpers";
import Product from "../../components/Product";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { doc } from "firebase/firestore";
import "./Home.css";

export default function Home() {
    const { user } = useContext(AuthContext);

    // useCollection hook
    const { error, isPending, document } = useCollection("products");
    if (document.length === 0) {
        return (
            <div className="Home">
                <PrimaryMsg msg={"Documents Beign Loaded"} />
            </div>
        );
    }

    return (
        <div className="Home flex-column">
            <div className="slider">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="https://m.media-amazon.com/images/I/61aURrton0L._SX3000_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/July_23/MFD/Unrec/Shoes/3000_shoes._CB601250574_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/vendorcentral/supporthub/trainingCourses/learningPaths/5300-Kitchen---Water-bottles--Lunch-box--hero-v2-3000-x-1200-_Under_1._CB601243436_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/SVD/July/Hero/PC_tall_Hero_SVD_UNREC_BOB_3000x1200._CB601321325_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item active" data-bs-interval="5000">
                            <img src="https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="200">
                            <img src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev"></button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next"></button>
                </div>
            </div>
            <div className="products flex-column">
                {error && <ErrorMsg error={error} />}
                <div className="row">
                    {document.length > 0 && (
                        <>
                            <div className="col flex-column" id="col-1">
                                <p className="head">Up to 70% off | Styles for men</p>
                                <div className="categories flex">
                                    <div className="cate" id="cate-1">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-1-186-116._SY116_CB636110853_.jpg" alt="" />
                                        <p>Clothing</p>
                                    </div>
                                    <div className="cate" id="cate-2">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-2-186-116._SY116_CB636110853_.jpg" alt="" />
                                        <p>Footwear</p>
                                    </div>
                                    <div className="cate" id="cate-3">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-3-186-116._SY116_CB636110853_.jpg" alt="" />
                                        <p>Watches</p>
                                    </div>
                                    <div className="cate" id="cate-4">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-4-186-116._SY116_CB636110853_.jpg" alt="" />
                                        <p>Bages & Luggages</p>
                                    </div>
                                </div>
                                <NavLink className={"navLink"}>Mega Fashion Days</NavLink>
                            </div>
                            <div className="col flex-column" id="col-2">
                                <p className="head">Up to 70% off | Clearance store</p>
                                <div className="single-img">
                                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Clearance_store_Desktop_CC_1x._SY304_CB628315133_.jpg" alt="" />
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                            <div className="col flex-column" id="col-3">
                                <p className="head">Wellness wednesday | Up to 50% off | Blood glucose</p>
                                <div className="categories">
                                    <div className="cate" id="cate-1">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Glasscare1X._SY116_CB410830553_.jpg" alt="" />
                                        <p>Cleaning accessories</p>
                                    </div>
                                    <div className="cate" id="cate-2">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Rim_tyrecare1x._SY116_CB410830552_.jpg" alt="" />
                                        <p>Tyre & rim care</p>
                                    </div>
                                    <div className="cate" id="cate-3">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vega_helmet_186x116._SY116_CB405090404_.jpg" alt="" />
                                        <p>Helmets</p>
                                    </div>
                                    <div className="cate" id="cate-4">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vaccum1x._SY116_CB410830552_.jpg" alt="" />
                                        <p>Vacuum Cleaner</p>
                                    </div>
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                            {user ? (
                                <div className="col flex-column" id="col-2">
                                    <p className="head">New Series CRUSHED | Watch FREE on miniTV</p>
                                    <div className="single-img">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/AmazonTV/Ravina/Desktop/DeskCC-379x304_CRUSHED-S2_V2._SY304_CB620412632_.jpg" alt="" />
                                    </div>
                                    <NavLink className={"navLink"}>Watch for FREE | miniTV</NavLink>
                                </div>
                            ) : (
                                <div className="col" id="signIn">
                                    <p className="head">Sign in for your best experience</p>
                                    <NavLink className={"navLink"} to={"/signin"}>
                                        Sign in Securely
                                    </NavLink>
                                </div>
                            )}
                            <div className="col flex-column" id="col-2">
                                <p className="head">Wellness wednesday | Up to 50% off | Blood glucose</p>
                                <div className="single-img">
                                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Pharmacy/GW/2023/WK26/PC_CC_379x304_Set01_26June._SY304_CB602489297_.jpg" alt="" />
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                            <div className="col flex-column" id="col-3">
                                <p className="head">Revamp your home in style</p>
                                <div className="categories flex">
                                    <div className="cate" id="cate-1">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2021/GW/MSO/April/372x232_1_Low._SY116_CB670263840_.jpg" alt="" />
                                        <p>Beadsheet, Curtains & more</p>
                                    </div>
                                    <div className="cate" id="cate-2">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2021/GW/MSO/April/372x232_2_Low._SY116_CB670263840_.jpg" alt="" />
                                        <p>Home Decoration</p>
                                    </div>
                                    <div className="cate" id="cate-3">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2021/GW/MSO/April/372x232_3_Low._SY116_CB670263840_.jpg" alt="" />
                                        <p>Home Storage</p>
                                    </div>
                                    <div className="cate" id="cate-4">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2021/GW/MSO/April/372x232_4_Low._SY116_CB670263840_.jpg" alt="" />
                                        <p>Lignting Solutions</p>
                                    </div>
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                            <div className="col flex-column" id="col-2">
                                <p className="head">Now get medicines delivered | Up to 30% off</p>
                                <div className="single-img">
                                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Pharmacy/GW/2023/WK26/PC_CC_379x307x608_01_26June._SY304_CB602495929_.jpg" alt="" />
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                            <div className="col flex-column" id="col-3">
                                <p className="head">Up to 60% off | Professional tools, testing & more</p>
                                <div className="categories">
                                    <div className="cate" id="cate-1">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2018/QC/Tools1x._SY116_CB424026090_.jpg" alt="" />
                                        <p>Home Repaire</p>
                                    </div>
                                    <div className="cate" id="cate-2">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2021/BAU_GW_Graphics/PCQC/2._SY116_CB643952439_.jpg" alt="" />
                                        <p>Mashines</p>
                                    </div>
                                    <div className="cate" id="cate-3">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2021/BAU_GW_Graphics/PCQC/1._SY116_CB643952439_.jpg" alt="" />
                                        <p>Watches</p>
                                    </div>
                                    <div className="cate" id="cate-4">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Biss/2018/QC/med1x._SY116_CB424026091_.jpg" alt="" />
                                        <p>Insurence</p>
                                    </div>
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                            <div className="col flex-column" id="col-2">
                                <p className="head">Prime Day is July 15th and 16th</p>
                                <div className="single-img">
                                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IN-Events/PD23/GW/Desktop_CC_V2_EN_1x._SY304_CB602878183_.jpg" alt="" />
                                </div>
                                <NavLink className={"navLink"}>Explore all prime day offers</NavLink>
                            </div>
                            <div className="col flex-column" id="col-3">
                                <p className="head">Shop & Pay | Earn rewards daily</p>
                                <div className="categories flex">
                                    <div className="cate" id="cate-1">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/AmazonBrands/Bikram/Bikram1/QC_Toys--baby_1861._SY116_CB602730009_.jpg" alt="" />
                                        <p>Starting ₹99 | Wipes</p>
                                    </div>
                                    <div className="cate" id="cate-2">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/AmazonBrands/Bikram/Bikram1/QC_Toys--baby_1862._SY116_CB602730009_.jpg" alt="" />
                                        <p>Up to 70% off | Diapers</p>
                                    </div>
                                    <div className="cate" id="cate-3">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/AmazonBrands/Bikram/Bikram1/QC_Toys--baby_1863._SY116_CB602730009_.jpg" alt="" />
                                        <p>Starting ₹149 | Toys & games</p>
                                    </div>
                                    <div className="cate" id="cate-4">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/AmazonBrands/Bikram/Bikram1/QC_Toys--baby_1864._SY116_CB602730009_.jpg" alt="" />
                                        <p>Starting ₹299 | Soft toys</p>
                                    </div>
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                            {!user ? (
                                <div className="col flex-column" id="col-2">
                                    <p className="head">Sell on Amazon with 1-Click Launch Support</p>
                                    <div className="single-img">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/malar/March23/LR_379X304._SY304_CB595115209_.jpg" alt="" />
                                    </div>
                                    <NavLink to={"/signin"} className={"navLink"}>
                                        Register Now
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="col flex-column" id="col-2">
                                    <p className="head">Starting ₹99 | Start your fitness journey</p>
                                    <div className="single-img">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Sports/GW_Desktop/1199101_379x304_Compressed._SY304_CB448278349_.jpg" alt="" />
                                    </div>
                                    <NavLink className={"navLink"}>See More</NavLink>
                                </div>
                            )}
                            <div className="col flex-column" id="col-3">
                                <p className="head">Shop & Pay | Earn rewards daily</p>
                                <div className="categories">
                                    <div className="cate" id="cate-1">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonPay/Rewards/GWBTFPercolateCards/PC_Quard_Card_186X116_ScratchCard._SY116_CB627364845_.jpg" alt="" />
                                        <p>Claim your Scratch Cards</p>
                                    </div>
                                    <div className="cate" id="cate-2">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonPay/Rewards/GWBTFPercolateCards/PC_Quard_Card_186X116_CollectedOffers._SY116_CB627364845_.jpg" alt="" />
                                        <p>Redeem Your Collected Rewards</p>
                                    </div>
                                    <div className="cate" id="cate-3">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/APay/GWQC/PC_Pay__Win0.5x._SY116_CB616103432_.jpg" alt="" />
                                        <p>Pay & Win scratch cards</p>
                                    </div>
                                    <div className="cate" id="cate-4">
                                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/APay/GWQC/PC_Shop__collect0.5x._SY116_CB616103432_.jpg" alt="" />
                                        <p>Shop & Collect Rewords daily</p>
                                    </div>
                                </div>
                                <NavLink className={"navLink"}>See More</NavLink>
                            </div>
                        </>
                    )}
                    {document.length > 0 &&
                        document.map((product) => {
                            return <Product productInfo={product} />;
                        })}
                </div>
            </div>
            {!user && <Recommendation />}
            <Footer />
        </div>
    );
}
