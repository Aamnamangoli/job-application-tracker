import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.email || !form.password) {

            alert(
                "Please enter email and password"
            );

            return;
        }

        try {

            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    email: form.email.trim(),
                    password: form.password
                }
            );


            // =========================
            // CHECK TOKEN
            // =========================

            if (!res.data || !res.data.token) {

                console.error(
                    "Login response:",
                    res.data
                );

                throw new Error(
                    "Login succeeded but no token was received from the server."
                );
            }


            // =========================
            // SAVE TOKEN
            // =========================

            localStorage.setItem(
                "token",
                res.data.token
            );


            // =========================
            // SAVE USER
            // =========================

            if (res.data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );

            }


            // =========================
            // VERIFY TOKEN WAS SAVED
            // =========================

            const savedToken =
                localStorage.getItem("token");

            if (!savedToken) {

                throw new Error(
                    "Token could not be saved in browser storage."
                );
            }


            console.log(
                "Login successful"
            );

            console.log(
                "Token saved:",
                savedToken
            );


            alert(
                "Login successful!"
            );


            // =========================
            // GO TO DASHBOARD
            // =========================

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>
                    Welcome Back
                </h1>

                <p className="auth-subtitle">
                    Login to Job Application Tracker
                </p>


                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>


                <p className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}