import { useSignUpAuth } from "../../hooks/useSignUpAuth";
import { useToggle } from "../../hooks/useToggle";
import { useInput } from "../../hooks/useInput";
import { NavLink } from "react-router-dom";
import { ErrorMsg } from "../../helpers";
import React, { useState } from "react";
import "../login/Login.css";

export default function Signup() {
    // useInput hook
    const [firstName, updateFirstName] = useInput("");
    const [lastName, updateLastName] = useInput("");
    const [email, updateEmail] = useInput("");
    const [password, updatePassword] = useInput("");
    const [confirmPass, updateConfirmPass] = useInput("");
    const [passwordErr, setPasswordErr] = useState("");

    // useToggle hook
    const [showPassword, toggleShowPassword] = useToggle(false);

    // useSignUpAuth hook
    const { error, isPending, signUp } = useSignUpAuth(firstName, lastName, email, password);

    // signup form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordErr(null);

        // checking if the confirmed password is metching or not
        if (password !== confirmPass) {
            setPasswordErr("Check Your Password");
            return;
        }

        // signing up the user
        signUp();
    };

    const throwErr = () => {
        if(passwordErr) {
            return <ErrorMsg error={passwordErr} />
        } else if (error) {
            return <ErrorMsg error={error} />
        }
    }
    return (
        <div className="Login flex-column Signup">
            {throwErr()}

            <form className="flex-column" onSubmit={handleSubmit} style={error || passwordErr ? { marginTop: "30px" } : { marginTop: "0px" }}>
                <p>Sign-up</p>
                <div className="mb-0 flex name">
                    <div className="first-name">
                        <label htmlFor="first-name" className="form-label">
                            First Name :
                        </label>
                        <input type="text" required value={firstName} onChange={updateFirstName} className="shadow-none form-control" id="first-name" aria-describedby="emailHelp" />
                    </div>
                    <div className="last-name">
                        <label htmlFor="last-name" className="form-label">
                            Last Name :
                        </label>
                        <input type="text" required value={lastName} onChange={updateLastName} className="shadow-none form-control" id="last-name" aria-describedby="emailHelp" />
                    </div>
                </div>
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
                    <input type={showPassword ? "text" : "password"} required value={confirmPass} onChange={updateConfirmPass} className="shadow-none form-control" id="password" />
                </div>
                <div className="mb-0">
                    <label htmlFor="confirm-pass" className="form-label">
                        Confirm Password :
                    </label>
                    <input type={showPassword ? "text" : "password"} required value={password} onChange={updatePassword} className="shadow-none form-control" id="confirm-pass" />
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
                <hr />
                <NavLink to={"/signin"} className="btn btn-primary create-acc">
                    Already Have An Account ( Login )
                </NavLink>
            </form>
        </div>
    );
}
