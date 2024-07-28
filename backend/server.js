require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const apiV1Router = require("./routes");
const User = require("./models/user.model");

// Load environment variables from .env file, where API keys and passwords are configured

// Create Express server
const app = express();

app.use(cors());
// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", apiV1Router);

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
    try {
        await User.create({ email: "admin@indigo.in", role: "admin", password: "admin" });
    } catch (err) {}
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
