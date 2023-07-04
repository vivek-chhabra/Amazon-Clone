import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Recommendation.css";
import React from "react";

export default function Recommendation() {
    const navigate = useNavigate();
    return (
        <div className="Recommendation flex-column">
            <p>See personalized recommendations</p>
            <button className="btn btn-primary" onClick={() => navigate("/signup")}>
                Sign in
            </button>
            <p className="start-here flex">
                <span>New customer ? </span>
                <NavLink to={"/signup"}> Start here.</NavLink>
            </p>
        </div>
    );
}
