import ProductDetails from "./pages/product details/ProductDetails";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { AuthContext } from "./context/AuthContext";
import SellProduct from "./pages/sell/SellProduct";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import { useContext } from "react";
import "./App.css";


function App() {
    const { isAuthReady, user } = useContext(AuthContext);

    return (
        isAuthReady && (
            <div className="App" style={user ? { paddingBottom: "40px" } : { paddingBottom: "0px" }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Amazon-Clone" element={<Navigate to={"/"} />} />
                    <Route path="/signin" element={user ? <Navigate to={"/"} /> : <Login />} />
                    <Route path="/signup" element={user ? <Navigate to={"/"} /> : <Signup />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/cart/cartId" element={<Cart />} />
                    <Route path="/product/:id" element={user ? <ProductDetails /> : <Navigate to={"/signin"} />} />
                    <Route path="/add-product" element={user ? <SellProduct /> : <Navigate to={"/signin"} />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        )
    );
}

export default App;
