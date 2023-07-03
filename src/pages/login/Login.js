import { useLoginAuth } from "../../hooks/useLoginAuth";
import { useToggle } from "../../hooks/useToggle";
import { useInput } from "../../hooks/useInput";
import { ErrorMsg } from "../../helpers";
import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

export default function Login() {
    // useInput hook
    const [email, updateEmail] = useInput("");
    const [password, updatePassword] = useInput("");

    // useToggle hook
    const [showPassword, toggleShowPassword] = useToggle(false);

    // useLoginAuth hook
    const { error, isPending, login } = useLoginAuth(email, password);

    // form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="Login flex-column">
            {error && <ErrorMsg error={error} />}
            <form className="flex-column" onSubmit={handleSubmit} style={error ? { marginTop: "30px" } : { marginTop: "0px" }}>
                <p>Sign-in</p>
                <div className="mb-0">
                    <label htmlFor="email" className="form-label">
                        Email :
                    </label>
                    <input type="email" required value={email} onChange={updateEmail} className="shadow-none form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-0">
                    <label htmlFor="password" className="form-label">
                        Password :
                    </label>
                    <input type={showPassword ? "text" : "password"} required value={password} onChange={updatePassword} className="shadow-none form-control" id="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" onClick={toggleShowPassword} className="form-check-input shadow-none" id="show-password" />
                    <label className="form-check-label " htmlFor="show-password">
                        Show Password
                    </label>
                </div>
                {isPending ? (
                    <button type="submit" disabled className="btn btn-primary">
                        Loading...
                    </button>
                ) : (
                    <button type="submit" className="btn btn-primary">
                        Continue
                    </button>
                )}
                <div className="signin-msg">By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please go through our Privacy Notice, our Cookies Notice and our Interest-Based Notice.</div>
                <NavLink to={"/signup"} className="btn btn-primary create-acc">
                    Create your Amazon Account
                </NavLink>
            </form>
        </div>
    );
}
