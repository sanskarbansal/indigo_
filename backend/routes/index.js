const express = require("express");
const router = express.Router();
const flightRoutes = require("./flight.route");
const authRoutes = require("./auth.route");
const subscriptionRoutes = require("./subscription.route");
const { authenticateToken } = require("../middleware/auth");
// Routes

router.use("/v1/flights", authenticateToken, flightRoutes);
router.use("/v1/auth", authRoutes);
router.use("/v1/user", authenticateToken, subscriptionRoutes);

module.exports = router;
