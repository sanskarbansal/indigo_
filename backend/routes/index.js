const express = require("express");
const router = express.Router();
// const flightRoutes = require("./flight.route");
const authRoutes = require("./auth.route");
// Routes

// router.use("/v1/flights", flightRoutes);
router.use("/v1/auth", authRoutes);

module.exports = router;
