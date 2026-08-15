const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        // =========================
        // USER
        // =========================

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },


        // =========================
        // COMPANY
        // =========================

        companyName: {
            type: String,
            required: [true, "Company Name is required"],
            trim: true,
            minlength: [
                2,
                "Company Name must contain at least 2 characters"
            ],
            maxlength: [
                100,
                "Company Name cannot exceed 100 characters"
            ]
        },


        // =========================
        // JOB ROLE
        // =========================

        jobRole: {
            type: String,
            required: [true, "Job Role is required"],
            trim: true,
            minlength: [
                2,
                "Job Role must contain at least 2 characters"
            ],
            maxlength: [
                100,
                "Job Role cannot exceed 100 characters"
            ]
        },


        // =========================
        // LOCATION
        // =========================

        location: {
            type: String,
            trim: true,
            maxlength: [
                100,
                "Location cannot exceed 100 characters"
            ],
            default: ""
        },


        // =========================
        // STATUS
        // =========================

        status: {
            type: String,
            enum: {
                values: [
                    "Applied",
                    "Interview",
                    "Selected",
                    "Rejected"
                ],
                message:
                    "Status must be Applied, Interview, Selected, or Rejected"
            },
            default: "Applied"
        },


        // =========================
        // APPLIED DATE
        // =========================

        appliedDate: {
            type: String,
            trim: true,
            default: ""
        },


        // =========================
        // EMAIL
        // =========================

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
            validate: {
                validator: function (value) {

                    if (!value) {
                        return true;
                    }

                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        value
                    );
                },

                message:
                    "Please enter a valid email address"
            }
        },


        // =========================
        // PHONE
        // =========================

        phone: {
            type: String,
            trim: true,
            default: "",
            validate: {
                validator: function (value) {

                    if (!value) {
                        return true;
                    }

                    return /^[0-9+\-\s()]{7,20}$/.test(
                        value
                    );
                },

                message:
                    "Please enter a valid phone number"
            }
        },


        // =========================
        // SALARY
        // =========================

        salary: {
            type: String,
            trim: true,
            maxlength: [
                50,
                "Salary cannot exceed 50 characters"
            ],
            default: ""
        },


        // =========================
        // JOB TYPE
        // =========================

        jobType: {
            type: String,
            enum: {
                values: [
                    "Full-time",
                    "Internship",
                    "Part-time"
                ],
                message:
                    "Job Type must be Full-time, Internship, or Part-time"
            },
            default: "Full-time"
        },


        // =========================
        // WORK MODE
        // =========================

        workMode: {
            type: String,
            enum: {
                values: [
                    "On-site",
                    "Remote",
                    "Hybrid"
                ],
                message:
                    "Work Mode must be On-site, Remote, or Hybrid"
            },
            default: "On-site"
        },


        // =========================
        // JOB LINK
        // =========================

        jobLink: {
            type: String,
            trim: true,
            default: "",
            validate: {
                validator: function (value) {

                    if (!value) {
                        return true;
                    }

                    try {

                        const url =
                            new URL(value);

                        return (
                            url.protocol === "http:" ||
                            url.protocol === "https:"
                        );

                    } catch (error) {

                        return false;

                    }
                },

                message:
                    "Please enter a valid job URL"
            }
        }
    },

    {
        timestamps: true
    }
);


module.exports = mongoose.model(
    "Application",
    applicationSchema
);