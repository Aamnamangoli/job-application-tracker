import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "../App.css";

export default function Applications() {

    const navigate = useNavigate();

    // =========================
    // APPLICATION DATA
    // =========================

    const [applications, setApplications] =
        useState([]);

    const [form, setForm] = useState({

        companyName: "",
        jobRole: "",
        location: "",
        status: "Applied",
        appliedDate: "",
        email: "",
        phone: "",
        salary: "",
        jobType: "Full-time",
        workMode: "On-site",
        jobLink: ""

    });

    const [editingId, setEditingId] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [filterStatus, setFilterStatus] =
        useState("All");

    const [showLogoutConfirm, setShowLogoutConfirm] =
        useState(false);


    // =========================
    // FETCH APPLICATIONS
    // =========================

    const fetchApplications = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/applications",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setApplications(response.data);

        } catch (error) {

            console.error(
                "Error fetching applications:",
                error
            );

        }

    };


    useEffect(() => {

        fetchApplications();

    }, []);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });

    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setForm({

            companyName: "",
            jobRole: "",
            location: "",
            status: "Applied",
            appliedDate: "",
            email: "",
            phone: "",
            salary: "",
            jobType: "Full-time",
            workMode: "On-site",
            jobLink: ""

        });

        setEditingId(null);

    };


    // =========================
    // ADD / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.companyName ||
            !form.jobRole
        ) {

            alert(
                "Company Name and Job Role are required."
            );

            return;

        }

        try {

            const token =
                localStorage.getItem("token");

            const config = {

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }

            };


            if (editingId) {

                await axios.put(
                    `http://localhost:5000/applications/${editingId}`,
                    form,
                    config
                );

                alert(
                    "Application updated successfully!"
                );

            } else {

                await axios.post(
                    "http://localhost:5000/applications",
                    form,
                    config
                );

                alert(
                    "Application added successfully!"
                );

            }


            resetForm();

            fetchApplications();

        } catch (error) {

            console.error(
                "Error saving application:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to save application."
            );

        }

    };


    // =========================
    // EDIT
    // =========================

    const editApplication = (application) => {

        setForm({

            companyName:
                application.companyName || "",

            jobRole:
                application.jobRole || "",

            location:
                application.location || "",

            status:
                application.status || "Applied",

            appliedDate:
                application.appliedDate || "",

            email:
                application.email || "",

            phone:
                application.phone || "",

            salary:
                application.salary || "",

            jobType:
                application.jobType || "Full-time",

            workMode:
                application.workMode || "On-site",

            jobLink:
                application.jobLink || ""

        });

        setEditingId(
            application._id
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================
    // DELETE
    // =========================

    const deleteApplication = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this application?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/applications/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchApplications();

        } catch (error) {

            console.error(
                "Error deleting application:",
                error
            );

            alert(
                "Unable to delete application."
            );

        }

    };


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


    // =========================
    // SEARCH + FILTER
    // =========================

    const filteredApplications =
        applications.filter((application) => {

            const searchText =
                search.toLowerCase();

            const company =
                (
                    application.companyName ||
                    ""
                ).toLowerCase();

            const role =
                (
                    application.jobRole ||
                    ""
                ).toLowerCase();

            const location =
                (
                    application.location ||
                    ""
                ).toLowerCase();

            const matchesSearch =
                company.includes(searchText) ||
                role.includes(searchText) ||
                location.includes(searchText);

            const matchesStatus =
                filterStatus === "All" ||
                application.status === filterStatus;

            return (
                matchesSearch &&
                matchesStatus
            );

        });


    return (

        <div className="app-layout">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

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


                <nav className="sidebar-menu">

                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
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


                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
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


                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
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


                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
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

                <div className="mobile-header">
                    <div className="mobile-brand">
                        💼 Job Tracker
                    </div>
                </div>


                {/* HEADER */}

                <div className="top-bar">

                    <div className="brand-section">

                        <div className="brand-icon">
                            📊
                        </div>

                        <div>

                            <h1 className="main-title">
                                Applications
                            </h1>

                            <p className="welcome-text">
                                Add and manage your job applications
                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================
                    APPLICATION FORM
                ========================= */}

                <div className="form-section">

                    <h2>
                        {editingId
                            ? "Edit Job Application"
                            : "Add Job Application"}
                    </h2>


                    <form
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={form.companyName}
                            onChange={handleChange}
                            required
                        />


                        <input
                            type="text"
                            name="jobRole"
                            placeholder="Job Role"
                            value={form.jobRole}
                            onChange={handleChange}
                            required
                        />


                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={form.location}
                            onChange={handleChange}
                        />


                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option value="Applied">
                                Applied
                            </option>

                            <option value="Interview">
                                Interview
                            </option>

                            <option value="Selected">
                                Selected
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>
                        </select>


                        <input
                            type="date"
                            name="appliedDate"
                            value={form.appliedDate}
                            onChange={handleChange}
                        />


                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />


                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                        />


                        <input
                            type="text"
                            name="salary"
                            placeholder="Salary / Stipend"
                            value={form.salary}
                            onChange={handleChange}
                        />


                        <select
                            name="jobType"
                            value={form.jobType}
                            onChange={handleChange}
                        >
                            <option value="Full-time">
                                Full-time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Part-time">
                                Part-time
                            </option>
                        </select>


                        <select
                            name="workMode"
                            value={form.workMode}
                            onChange={handleChange}
                        >
                            <option value="On-site">
                                On-site
                            </option>

                            <option value="Remote">
                                Remote
                            </option>

                            <option value="Hybrid">
                                Hybrid
                            </option>
                        </select>


                        <input
                            type="url"
                            name="jobLink"
                            placeholder="Job Link"
                            value={form.jobLink}
                            onChange={handleChange}
                        />


                        <button
                            type="submit"
                        >
                            {editingId
                                ? "Update Application"
                                : "Add Application"}
                        </button>


                        {editingId && (

                            <button
                                type="button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </form>

                </div>


                {/* =========================
                    APPLICATION LIST
                ========================= */}

                <div className="search-section">

                    <h2>
                        All Applications
                    </h2>

                    <div className="filters">

                        <input
                            type="text"
                            placeholder="Search company, role or location..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />


                        <select
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(
                                    e.target.value
                                )
                            }
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Applied">
                                Applied
                            </option>

                            <option value="Interview">
                                Interview
                            </option>

                            <option value="Selected">
                                Selected
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>

                        </select>

                    </div>


                    {/* TABLE */}

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Salary
                                    </th>

                                    <th>
                                        Job Type
                                    </th>

                                    <th>
                                        Work Mode
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Job Link
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredApplications.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="12"
                                            style={{
                                                textAlign:
                                                    "center"
                                            }}
                                        >
                                            No applications found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredApplications.map(
                                        (application) => (

                                            <tr
                                                key={
                                                    application._id
                                                }
                                            >

                                                <td>
                                                    {
                                                        application.companyName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.jobRole
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.location
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            `status ${
                                                                (
                                                                    application.status ||
                                                                    ""
                                                                ).toLowerCase()
                                                            }`
                                                        }
                                                    >
                                                        {
                                                            application.status
                                                        }
                                                    </span>

                                                </td>

                                                <td>
                                                    {
                                                        application.appliedDate ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.salary ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.jobType ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.workMode ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.email ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.phone ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>

                                                    {
                                                        application.jobLink
                                                            ? (
                                                                <a
                                                                    href={
                                                                        application.jobLink
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    View
                                                                </a>
                                                            )
                                                            : "-"
                                                    }

                                                </td>

                                                <td>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editApplication(
                                                                application
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteApplication(
                                                                application._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

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
                                    setShowLogoutConfirm(
                                        false
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-logout"
                                onClick={logout}
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