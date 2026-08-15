import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "../App.css";

export default function JobApplicationForm() {

    const navigate = useNavigate();

    // =========================
    // LOGOUT
    // =========================

    const [showLogoutConfirm, setShowLogoutConfirm] =
        useState(false);

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
    // APPLICATIONS
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


    // =========================
    // FETCH APPLICATIONS
    // =========================

    const fetchApplications = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/applications",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setApplications(res.data);

        } catch (err) {

            console.error(
                "Error fetching applications:",
                err
            );

        }
    };


    useEffect(() => {

        fetchApplications();

    }, []);


    // =========================
    // DASHBOARD COUNTS
    // =========================

    const totalApplications =
        applications.length;

    const appliedCount =
        applications.filter(
            (app) =>
                app.status === "Applied"
        ).length;

    const interviewCount =
        applications.filter(
            (app) =>
                app.status === "Interview"
        ).length;

    const selectedCount =
        applications.filter(
            (app) =>
                app.status === "Selected"
        ).length;

    const rejectedCount =
        applications.filter(
            (app) =>
                app.status === "Rejected"
        ).length;


    // =========================
    // BAR GRAPH DATA
    // =========================

    const chartData = [

        {
            status: "Applied",
            count: appliedCount
        },

        {
            status: "Interview",
            count: interviewCount
        },

        {
            status: "Selected",
            count: selectedCount
        },

        {
            status: "Rejected",
            count: rejectedCount
        }

    ];


    // =========================
    // SEARCH + FILTER
    // =========================

    const filteredApplications =
        applications.filter((app) => {

            const searchText =
                search.toLowerCase();

            const companyName =
                app.companyName
                    ? app.companyName.toLowerCase()
                    : "";

            const jobRole =
                app.jobRole
                    ? app.jobRole.toLowerCase()
                    : "";

            const location =
                app.location
                    ? app.location.toLowerCase()
                    : "";

            const matchesSearch =
                companyName.includes(searchText) ||
                jobRole.includes(searchText) ||
                location.includes(searchText);

            const matchesStatus =
                filterStatus === "All" ||
                app.status === filterStatus;

            return (
                matchesSearch &&
                matchesStatus
            );

        });


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
    // ADD / UPDATE APPLICATION
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.companyName ||
            !form.jobRole
        ) {

            alert(
                "Company Name and Job Role are required"
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

        } catch (err) {

            console.error(
                "Error saving application:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Error saving application. Check your backend."
            );
        }
    };


    // =========================
    // EDIT APPLICATION
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
    // DELETE APPLICATION
    // =========================

    const deleteApplication = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this application?"
            );

        if (!confirmDelete) {

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

        } catch (err) {

            console.error(
                "Error deleting application:",
                err
            );

            alert(
                "Unable to delete application."
            );
        }
    };


    // =========================
    // PAGE
    // =========================

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


                    {/* APPLICATIONS */}

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


                    {/* PROFILE */}

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


                    {/* SETTINGS */}

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


                {/* SIDEBAR LOGOUT */}

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
            💼
        </div>

        <div>
            <h1 className="main-title">
                Job Application Tracker
            </h1>

            <p className="welcome-text">
                Manage your job applications
            </p>
        </div>

    </div>

</div>


                {/* =========================
                    DASHBOARD CARDS
                ========================= */}

                <div className="dashboard">


                    <div className="card">

                        <h3>
                            Total Applications
                        </h3>

                        <h2>
                            {totalApplications}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Applied
                        </h3>

                        <h2>
                            {appliedCount}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Interviews
                        </h3>

                        <h2>
                            {interviewCount}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Selected
                        </h3>

                        <h2>
                            {selectedCount}
                        </h2>

                    </div>


                    <div className="card">

                        <h3>
                            Rejected
                        </h3>

                        <h2>
                            {rejectedCount}
                        </h2>

                    </div>


                </div>


                {/* =========================
                    BAR GRAPH
                ========================= */}

                <div className="chart-container">

                    <h2>
                        Application Status
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 20
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="status"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                name="Applications"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>


                {/* =========================
                    ADD / EDIT FORM
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
                        />


                        <input
                            type="text"
                            name="jobRole"
                            placeholder="Job Role"
                            value={form.jobRole}
                            onChange={handleChange}
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
                    SEARCH + FILTER
                ========================= */}

                <div className="search-section">


                    <h2>
                        Job Applications
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


                    {/* =========================
                        APPLICATION TABLE
                    ========================= */}

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
                                        (app) => (

                                            <tr
                                                key={app._id}
                                            >

                                                <td>
                                                    {app.companyName}
                                                </td>

                                                <td>
                                                    {app.jobRole}
                                                </td>

                                                <td>
                                                    {app.location}
                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={`status ${
                                                            (
                                                                app.status ||
                                                                ""
                                                            ).toLowerCase()
                                                        }`}
                                                    >
                                                        {app.status}
                                                    </span>

                                                </td>


                                                <td>
                                                    {app.appliedDate}
                                                </td>

                                                <td>
                                                    {app.salary || "-"}
                                                </td>

                                                <td>
                                                    {app.jobType || "-"}
                                                </td>

                                                <td>
                                                    {app.workMode || "-"}
                                                </td>

                                                <td>
                                                    {app.email || "-"}
                                                </td>

                                                <td>
                                                    {app.phone || "-"}
                                                </td>


                                                {/* JOB LINK */}

                                                <td>

                                                    {app.jobLink ? (

                                                        <a
                                                            href={
                                                                app.jobLink
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            View
                                                        </a>

                                                    ) : (

                                                        "-"

                                                    )}

                                                </td>


                                                {/* ACTIONS */}

                                                <td>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editApplication(
                                                                app
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteApplication(
                                                                app._id
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
                                    onClick={confirmLogout}
                                >
                                    Logout
                                </button>


                            </div>


                        </div>

                    </div>

                )}


            </main>

        </div>

    );

}