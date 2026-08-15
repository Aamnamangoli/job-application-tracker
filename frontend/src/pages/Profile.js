import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../App.css";

export default function Profile() {

    const navigate = useNavigate();

    // =========================
    // USER DATA
    // =========================

    const storedUser =
        JSON.parse(localStorage.getItem("user")) || {};

    const [name, setName] =
        useState(storedUser.name || "");

    const [email, setEmail] =
        useState(storedUser.email || "");

    const [editing, setEditing] =
        useState(false);

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [showLogoutConfirm, setShowLogoutConfirm] =
        useState(false);


    // =========================
    // LOGOUT
    // =========================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", {
            replace: true
        });
    };


    const confirmLogout = () => {

        setShowLogoutConfirm(false);

        logout();
    };


    // =========================
    // SAVE PROFILE
    // =========================

    const saveProfile = () => {

        const updatedUser = {
            ...storedUser,
            name: name,
            email: email
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setEditing(false);

        alert("Profile updated successfully!");
    };


    // =========================
    // CHANGE PASSWORD
    // =========================

    const changePassword = (e) => {

        e.preventDefault();

        if (!currentPassword || !newPassword) {

            alert(
                "Please enter current password and new password."
            );

            return;
        }

        if (newPassword.length < 6) {

            alert(
                "New password must be at least 6 characters."
            );

            return;
        }

        /*
         * Backend password update can be connected here.
         * For now this only validates the form.
         */

        alert("Password change request submitted.");

        setCurrentPassword("");
        setNewPassword("");
    };


    return (

        <div className="app-layout">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

                {/* SIDEBAR BRAND */}

                <div className="sidebar-brand">

                    <div className="sidebar-logo">
                        💼
                    </div>

                    <div>

                        <h2>
                            Job Tracker
                        </h2>

                        <span>
                            Placement Manager
                        </span>

                    </div>

                </div>


                {/* SIDEBAR MENU */}

                <nav className="sidebar-menu">

                    {/* DASHBOARD */}

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            🏠
                        </span>

                        <span>
                            Dashboard
                        </span>

                    </NavLink>


                    {/* APPLICATIONS */}

                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            📊
                        </span>

                        <span>
                            Applications
                        </span>

                    </NavLink>


                    {/* PROFILE */}

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            👤
                        </span>

                        <span>
                            Profile
                        </span>

                    </NavLink>


                    {/* SETTINGS */}

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            ⚙️
                        </span>

                        <span>
                            Settings
                        </span>

                    </NavLink>

                </nav>


                {/* LOGOUT */}

                <div className="sidebar-bottom">

                    <button
                        className="sidebar-item logout-sidebar"
                        onClick={() =>
                            setShowLogoutConfirm(true)
                        }
                    >

                        <span className="sidebar-icon">
                            🚪
                        </span>

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="main-content">


                {/* MOBILE HEADER */}

                <div className="mobile-header">

                    <div className="mobile-brand">
                        💼 Job Tracker
                    </div>

                </div>


                {/* =========================
                    TOP HEADER
                ========================= */}

                <div className="top-bar">

                    <div className="brand-section">

                        <div className="brand-icon">
                            👤
                        </div>

                        <div>

                            <h1 className="main-title">
                                My Profile
                            </h1>

                            <p className="welcome-text">
                                Manage your account
                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                    PROFILE CONTENT
                ========================= */}

                <div className="profile-page">

                    {/* PROFILE CARD */}

                    <div className="profile-card">

                        <div className="profile-header">

                            <div className="profile-avatar">
                                {name
                                    ? name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "A"}
                            </div>

                            <div>

                                <h2>
                                    My Profile
                                </h2>

                                <p>
                                    Manage your personal
                                    information
                                </p>

                            </div>

                        </div>


                        {/* PROFILE INFORMATION */}

                        <div className="profile-info">

                            <div className="profile-field">

                                <label>
                                    Name
                                </label>

                                {editing ? (

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                    />

                                ) : (

                                    <p>
                                        {name || "Not available"}
                                    </p>

                                )}

                            </div>


                            <div className="profile-field">

                                <label>
                                    Email
                                </label>

                                {editing ? (

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                    />

                                ) : (

                                    <p>
                                        {email || "Not available"}
                                    </p>

                                )}

                            </div>

                        </div>


                        {/* PROFILE BUTTONS */}

                        <div className="profile-actions">

                            {editing ? (

                                <>

                                    <button
                                        onClick={saveProfile}
                                    >
                                        💾 Save Profile
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditing(false)
                                        }
                                    >
                                        Cancel
                                    </button>

                                </>

                            ) : (

                                <button
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                >
                                    ✏️ Edit Profile
                                </button>

                            )}

                        </div>

                    </div>


                    {/* =========================
                        CHANGE PASSWORD
                    ========================= */}

                    <div className="profile-card">

                        <h2>
                            Change Password
                        </h2>

                        <p className="profile-description">
                            Update your account password
                        </p>


                        <form
                            onSubmit={changePassword}
                            className="password-form"
                        >

                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(
                                        e.target.value
                                    )
                                }
                            />


                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                            />


                            <button type="submit">
                                🔒 Change Password
                            </button>

                        </form>

                    </div>

                </div>

            </main>


            {/* =========================
                LOGOUT CONFIRMATION
            ========================= */}

            {showLogoutConfirm && (

                <div className="logout-overlay">

                    <div className="logout-modal">

                        <h2>
                            Logout?
                        </h2>

                        <p>
                            Are you sure you want to logout?
                        </p>


                        <div className="logout-modal-actions">

                            <button
                                className="cancel-logout"
                                onClick={() =>
                                    setShowLogoutConfirm(false)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className="confirm-logout"
                                onClick={confirmLogout}
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}