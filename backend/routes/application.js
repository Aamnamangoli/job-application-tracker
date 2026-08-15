const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const Application = require("../models/Application");

const authMiddleware =
    require("../middleware/authMiddleware");


// =========================
// ALLOWED VALUES
// =========================

const allowedStatuses = [
    "Applied",
    "Interview",
    "Selected",
    "Rejected"
];

const allowedJobTypes = [
    "Full-time",
    "Internship",
    "Part-time"
];

const allowedWorkModes = [
    "On-site",
    "Remote",
    "Hybrid"
];


// =========================
// VALIDATE REQUEST DATA
// =========================

const validateApplicationData = (data) => {

    const errors = [];


    // COMPANY NAME

    if (
        !data.companyName ||
        typeof data.companyName !== "string" ||
        !data.companyName.trim()
    ) {

        errors.push(
            "Company Name is required"
        );

    }


    // JOB ROLE

    if (
        !data.jobRole ||
        typeof data.jobRole !== "string" ||
        !data.jobRole.trim()
    ) {

        errors.push(
            "Job Role is required"
        );

    }


    // STATUS

    if (
        data.status &&
        !allowedStatuses.includes(
            data.status
        )
    ) {

        errors.push(
            "Invalid status"
        );

    }


    // JOB TYPE

    if (
        data.jobType &&
        !allowedJobTypes.includes(
            data.jobType
        )
    ) {

        errors.push(
            "Invalid job type"
        );

    }


    // WORK MODE

    if (
        data.workMode &&
        !allowedWorkModes.includes(
            data.workMode
        )
    ) {

        errors.push(
            "Invalid work mode"
        );

    }


    // EMAIL

    if (data.email) {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            typeof data.email !== "string" ||
            !emailRegex.test(
                data.email.trim()
            )
        ) {

            errors.push(
                "Please enter a valid email address"
            );

        }

    }


    // PHONE

    if (data.phone) {

        const phoneRegex =
            /^[0-9+\-\s()]{7,20}$/;

        if (
            typeof data.phone !== "string" ||
            !phoneRegex.test(
                data.phone.trim()
            )
        ) {

            errors.push(
                "Please enter a valid phone number"
            );

        }

    }


    // JOB LINK

    if (data.jobLink) {

        try {

            const url =
                new URL(
                    data.jobLink.trim()
                );

            if (
                url.protocol !== "http:" &&
                url.protocol !== "https:"
            ) {

                errors.push(
                    "Job Link must use http or https"
                );

            }

        } catch (error) {

            errors.push(
                "Please enter a valid job URL"
            );

        }

    }


    return errors;
};


// =========================
// GET ALL APPLICATIONS
// =========================

router.get(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const applications =
                await Application.find({
                    userId: req.user.id
                }).sort({
                    createdAt: -1
                });

            res.status(200).json(
                applications
            );

        } catch (error) {

            console.error(
                "GET applications error:",
                error
            );

            res.status(500).json({
                message:
                    "Unable to fetch applications"
            });

        }

    }
);


// =========================
// GET ONE APPLICATION
// =========================

router.get(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({
                    message:
                        "Invalid application ID"
                });

            }


            const application =
                await Application.findOne({
                    _id: req.params.id,
                    userId: req.user.id
                });


            if (!application) {

                return res.status(404).json({
                    message:
                        "Application not found"
                });

            }


            res.status(200).json(
                application
            );

        } catch (error) {

            console.error(
                "GET application error:",
                error
            );

            res.status(500).json({
                message:
                    "Unable to fetch application"
            });

        }

    }
);


// =========================
// ADD APPLICATION
// =========================

router.post(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const errors =
                validateApplicationData(
                    req.body
                );


            if (errors.length > 0) {

                return res.status(400).json({
                    message:
                        "Validation failed",
                    errors
                });

            }


            const application =
                new Application({

                    userId:
                        req.user.id,

                    companyName:
                        req.body.companyName.trim(),

                    jobRole:
                        req.body.jobRole.trim(),

                    location:
                        req.body.location
                            ? req.body.location.trim()
                            : "",

                    status:
                        req.body.status ||
                        "Applied",

                    appliedDate:
                        req.body.appliedDate
                            ? req.body.appliedDate.trim()
                            : "",

                    email:
                        req.body.email
                            ? req.body.email.trim()
                            : "",

                    phone:
                        req.body.phone
                            ? req.body.phone.trim()
                            : "",

                    salary:
                        req.body.salary
                            ? req.body.salary.trim()
                            : "",

                    jobType:
                        req.body.jobType ||
                        "Full-time",

                    workMode:
                        req.body.workMode ||
                        "On-site",

                    jobLink:
                        req.body.jobLink
                            ? req.body.jobLink.trim()
                            : ""

                });


            const savedApplication =
                await application.save();


            res.status(201).json(
                savedApplication
            );

        } catch (error) {

            console.error(
                "POST application error:",
                error
            );

            res.status(400).json({
                message:
                    "Unable to create application",
                error:
                    error.message
            });

        }

    }
);


// =========================
// UPDATE APPLICATION
// =========================

router.put(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({
                    message:
                        "Invalid application ID"
                });

            }


            const errors =
                validateApplicationData(
                    req.body
                );


            if (errors.length > 0) {

                return res.status(400).json({
                    message:
                        "Validation failed",
                    errors
                });

            }


            const updatedApplication =
                await Application.findOneAndUpdate(

                    {
                        _id:
                            req.params.id,

                        userId:
                            req.user.id
                    },

                    {

                        companyName:
                            req.body.companyName.trim(),

                        jobRole:
                            req.body.jobRole.trim(),

                        location:
                            req.body.location
                                ? req.body.location.trim()
                                : "",

                        status:
                            req.body.status ||
                            "Applied",

                        appliedDate:
                            req.body.appliedDate
                                ? req.body.appliedDate.trim()
                                : "",

                        email:
                            req.body.email
                                ? req.body.email.trim()
                                : "",

                        phone:
                            req.body.phone
                                ? req.body.phone.trim()
                                : "",

                        salary:
                            req.body.salary
                                ? req.body.salary.trim()
                                : "",

                        jobType:
                            req.body.jobType ||
                            "Full-time",

                        workMode:
                            req.body.workMode ||
                            "On-site",

                        jobLink:
                            req.body.jobLink
                                ? req.body.jobLink.trim()
                                : ""

                    },

                    {
                        new: true,
                        runValidators: true
                    }

                );


            if (!updatedApplication) {

                return res.status(404).json({
                    message:
                        "Application not found"
                });

            }


            res.status(200).json(
                updatedApplication
            );

        } catch (error) {

            console.error(
                "PUT application error:",
                error
            );

            res.status(400).json({
                message:
                    "Unable to update application",
                error:
                    error.message
            });

        }

    }
);


// =========================
// DELETE APPLICATION
// =========================

router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({
                    message:
                        "Invalid application ID"
                });

            }


            const deletedApplication =
                await Application.findOneAndDelete({

                    _id:
                        req.params.id,

                    userId:
                        req.user.id

                });


            if (!deletedApplication) {

                return res.status(404).json({
                    message:
                        "Application not found"
                });

            }


            res.status(200).json({

                message:
                    "Application deleted successfully"

            });

        } catch (error) {

            console.error(
                "DELETE application error:",
                error
            );

            res.status(500).json({
                message:
                    "Unable to delete application"
            });

        }

    }
);


module.exports = router;