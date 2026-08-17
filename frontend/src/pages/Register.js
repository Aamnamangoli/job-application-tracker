import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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


        // =========================
        // VALIDATION
        // =========================

        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.password
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }


        if (
            form.password.length < 6
        ) {

            alert(
                "Password must contain at least 6 characters"
            );

            return;
        }


        try {

            setLoading(true);


            // =========================
            // REGISTER
            // =========================

            const res = await axios.post(
                `${API_URL}/auth/register`,
                {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    password: form.password
                }
            );


            alert(
                res.data.message ||
                "Registration successful!"
            );


            // =========================
            // GO TO LOGIN
            // =========================

            navigate(
                "/login",
                {
                    replace: true
                }
            );


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>
                    Create Account
                </h1>

                <p className="auth-subtitle">
                    Register for Job Application Tracker
                </p>


                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                    />


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
                        autoComplete="new-password"
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register"}

                    </button>

                </form>


                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}