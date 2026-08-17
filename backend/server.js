require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// =========================
// ENVIRONMENT VARIABLES
// =========================

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

const CLIENT_URL =
    process.env.CLIENT_URL || "http://localhost:3000";


// =========================
// CHECK ENVIRONMENT
// =========================

if (!MONGO_URI) {

    console.error(
        "MONGO_URI is not defined in .env"
    );

    process.exit(1);
}


// =========================
// CORS
// =========================

app.use(
    cors({
        origin: CLIENT_URL
    })
);


// =========================
// BODY PARSER
// =========================

app.use(
    express.json()
);


// =========================
// ROUTES
// =========================

const authRoutes =
    require("./routes/auth");

const applicationRoutes =
    require("./routes/application");


app.use(
    "/auth",
    authRoutes
);


app.use(
    "/applications",
    applicationRoutes
);


// =========================
// HEALTH CHECK
// =========================

app.get(
    "/",
    (req, res) => {

        res.json({
            message:
                "Job Application Tracker API is running"
        });

    }
);


// =========================
// MONGODB
// =========================

mongoose
    .connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    })
    .then(() => {

        console.log(
            "MongoDB connected"
        );

    })
    .catch((error) => {

        console.error(
            "MongoDB connection error:",
            error.message
        );

        process.exit(1);

    });


// =========================
// SERVER
// =========================

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

        console.log(
            `Allowed frontend: ${CLIENT_URL}`
        );

    }
);