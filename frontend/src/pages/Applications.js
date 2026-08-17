import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const EMPTY_FORM = {
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
};

function Applications() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [showLogout, setShowLogout] = useState(false);

    // --------------------------------------------------
    // GET TOKEN
    // --------------------------------------------------

    const getToken = () => {
        return localStorage.getItem("token");
    };

    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", {
            replace: true
        });
    };

    // --------------------------------------------------
    // HANDLE UNAUTHORIZED
    // --------------------------------------------------

    const handleUnauthorized = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Your session has expired. Please login again.");

        navigate("/login", {
            replace: true
        });
    };

    // --------------------------------------------------
    // FETCH APPLICATIONS
    // --------------------------------------------------

    const fetchApplications = async () => {
        const token = getToken();

        if (!token) {
            navigate("/login", {
                replace: true
            });
            return;
        }

        try {
            setLoading(true);

            const response = await axios.get(
                `${API_URL}/applications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (Array.isArray(response.data)) {
                setApplications(response.data);
            } else {
                setApplications([]);
            }
        } catch (error) {
            console.error("Fetch applications error:", error);

            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to load applications."
            );
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // LOAD APPLICATIONS
    // --------------------------------------------------

    useEffect(() => {
        fetchApplications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --------------------------------------------------
    // HANDLE FORM CHANGE
    // --------------------------------------------------

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));
    };

    // --------------------------------------------------
    // RESET FORM
    // --------------------------------------------------

    const resetForm = () => {
        setForm({ ...EMPTY_FORM });
        setEditingId(null);
    };

    // --------------------------------------------------
    // ADD / UPDATE APPLICATION
    // --------------------------------------------------

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = getToken();

        if (!token) {
            alert("Please login before continuing.");

            navigate("/login", {
                replace: true
            });

            return;
        }

        if (!form.companyName.trim()) {
            alert("Please enter company name.");
            return;
        }

        if (!form.jobRole.trim()) {
            alert("Please enter job role.");
            return;
        }

        try {
            setSaving(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

            if (editingId) {
                await axios.put(
                    `${API_URL}/applications/${editingId}`,
                    form,
                    config
                );

                alert("Application updated successfully.");
            } else {
                await axios.post(
                    `${API_URL}/applications`,
                    form,
                    config
                );

                alert("Application added successfully.");
            }

            resetForm();

            await fetchApplications();
        } catch (error) {
            console.error("Save application error:", error);

            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to save application."
            );
        } finally {
            setSaving(false);
        }
    };

    // --------------------------------------------------
    // EDIT APPLICATION
    // --------------------------------------------------

    const handleEdit = (application) => {
        setForm({
            companyName: application.companyName || "",
            jobRole: application.jobRole || "",
            location: application.location || "",
            status: application.status || "Applied",
            appliedDate: application.appliedDate || "",
            email: application.email || "",
            phone: application.phone || "",
            salary: application.salary || "",
            jobType: application.jobType || "Full-time",
            workMode: application.workMode || "On-site",
            jobLink: application.jobLink || ""
        });

        setEditingId(application._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // --------------------------------------------------
    // DELETE APPLICATION
    // --------------------------------------------------

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) {
            return;
        }

        const token = getToken();

        if (!token) {
            navigate("/login", {
                replace: true
            });
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Application deleted successfully.");

            await fetchApplications();
        } catch (error) {
            console.error("Delete application error:", error);

            if (error.response?.status === 401) {
                handleUnauthorized();
                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to delete application."
            );
        }
    };

    // --------------------------------------------------
    // SEARCH + FILTER
    // --------------------------------------------------

    const filteredApplications = applications.filter(
        (application) => {
            const searchText = search.trim().toLowerCase();

            const company = String(
                application.companyName || ""
            ).toLowerCase();

            const role = String(
                application.jobRole || ""
            ).toLowerCase();

            const location = String(
                application.location || ""
            ).toLowerCase();

            const matchesSearch =
                company.includes(searchText) ||
                role.includes(searchText) ||
                location.includes(searchText);

            const matchesStatus =
                filterStatus === "All" ||
                application.status === filterStatus;

            return matchesSearch && matchesStatus;
        }
    );

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    return (
        <div className="app-layout">

            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="sidebar-brand">

                    <div className="sidebar-logo">
                        💼
                    </div>

                    <div>
                        <h2>Job Tracker</h2>

                        <span>
                            Placement Manager
                        </span>
                    </div>

                </div>

                <nav className="sidebar-menu">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span>🏠</span>
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span>📊</span>
                        Applications
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span>👤</span>
                        Profile
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span>⚙️</span>
                        Settings
                    </NavLink>

                </nav>

                <div className="sidebar-bottom">

                    <button
                        type="button"
                        className="sidebar-item"
                        onClick={() => setShowLogout(true)}
                    >
                        <span>🚪</span>
                        Logout
                    </button>

                </div>

            </aside>

            {/* MAIN CONTENT */}

            <main className="main-content">

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

                {/* APPLICATION FORM */}

                <section className="form-section">

                    <h2>
                        {editingId
                            ? "Edit Job Application"
                            : "Add Job Application"}
                    </h2>

                    <form onSubmit={handleSubmit}>

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
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Application"
                                    : "Add Application"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        )}

                    </form>

                </section>

                {/* APPLICATION LIST */}

                <section className="search-section">

                    <h2>
                        All Applications
                    </h2>

                    <div className="filters">

                        <input
                            type="text"
                            placeholder="Search company, role or location..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                        <select
                            value={filterStatus}
                            onChange={(event) =>
                                setFilterStatus(event.target.value)
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

                    <div className="table-container">

                        {loading ? (
                            <p>
                                Loading applications...
                            </p>
                        ) : (
                            <table>

                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Role</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Salary</th>
                                        <th>Job Type</th>
                                        <th>Work Mode</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredApplications.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                style={{
                                                    textAlign: "center"
                                                }}
                                            >
                                                No applications found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredApplications.map(
                                            (application) => (
                                                <tr
                                                    key={application._id}
                                                >

                                                    <td>
                                                        {application.companyName}
                                                    </td>

                                                    <td>
                                                        {application.jobRole}
                                                    </td>

                                                    <td>
                                                        {application.location || "-"}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`status ${
                                                                String(
                                                                    application.status ||
                                                                    "Applied"
                                                                ).toLowerCase()
                                                            }`}
                                                        >
                                                            {application.status ||
                                                                "Applied"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {application.appliedDate ||
                                                            "-"}
                                                    </td>

                                                    <td>
                                                        {application.salary || "-"}
                                                    </td>

                                                    <td>
                                                        {application.jobType || "-"}
                                                    </td>

                                                    <td>
                                                        {application.workMode || "-"}
                                                    </td>

                                                    <td>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    application
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
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
                        )}

                    </div>

                </section>

            </main>

            {/* LOGOUT MODAL */}

            {showLogout && (
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
                                type="button"
                                onClick={() =>
                                    setShowLogout(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
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

export default Applications;