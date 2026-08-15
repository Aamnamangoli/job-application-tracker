const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// REGISTER
// =========================

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check required fields

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        // Check existing user

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user

        const user = new User({

            name: name,

            email: email,

            password: hashedPassword

        });


        await user.save();


        res.status(201).json({

            message:
                "Registration successful"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error"

        });

    }

});


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        // Check fields

        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required"

            });

        }


        // Find user

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message:
                    "Invalid email or password"

            });

        }


        // Compare password

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({

                message:
                    "Invalid email or password"

            });

        }


        // Create token

        const token =
            jwt.sign(

                {
                    id: user._id,
                    email: user.email
                },

                "job_tracker_secret_key",

                {
                    expiresIn: "1d"
                }

            );


        res.json({

            message:
                "Login successful",

            token: token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error"

        });

    }

});

// =========================
// CHANGE PASSWORD
// =========================

router.put(
    "/change-password",
    authMiddleware,
    async (req, res) => {

        try {

            const {
                currentPassword,
                newPassword
            } = req.body;


            // Check fields

            if (
                !currentPassword ||
                !newPassword
            ) {

                return res.status(400).json({
                    message:
                        "Current password and new password are required"
                });

            }


            // Check new password length

            if (newPassword.length < 6) {

                return res.status(400).json({
                    message:
                        "New password must contain at least 6 characters"
                });

            }


            // Find logged-in user

            const user =
                await User.findById(req.user.id);


            if (!user) {

                return res.status(404).json({
                    message: "User not found"
                });

            }


            // Check current password

            const isMatch =
                await bcrypt.compare(
                    currentPassword,
                    user.password
                );


            if (!isMatch) {

                return res.status(400).json({
                    message:
                        "Current password is incorrect"
                });

            }


            // Hash new password

            const hashedPassword =
                await bcrypt.hash(
                    newPassword,
                    10
                );


            // Save new password

            user.password =
                hashedPassword;

            await user.save();


            res.json({
                message:
                    "Password changed successfully"
            });


        } catch (error) {

            console.error(
                "Change password error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error"
            });

        }

    }
);
// =========================
// CHANGE PASSWORD
// =========================

router.put(
    "/change-password",
    authMiddleware,
    async (req, res) => {

        // code here

    }
);

// =========================
// UPDATE PROFILE
// =========================

router.put(
    "/profile",
    authMiddleware,
    async (req, res) => {

        try {

            const { name, email } = req.body;

            if (!name || !email) {

                return res.status(400).json({
                    message: "Name and email are required"
                });

            }

            const user = await User.findById(
                req.user.id
            );

            if (!user) {

                return res.status(404).json({
                    message: "User not found"
                });

            }

            user.name = name;
            user.email = email;

            await user.save();

            res.json({
                message: "Profile updated successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );

            res.status(500).json({
                message: "Server error"
            });

        }

    }
);

module.exports = router;