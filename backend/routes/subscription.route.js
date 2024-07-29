const express = require("express");
const router = express.Router();
const { subscribeFlight, unsubscribeFlight, getUserSubscriptions } = require("../controllers/subscription.controller");

router.post("/subscribe/:flightId", subscribeFlight);
router.post("/unsubscribe/:flightId", unsubscribeFlight);
router.get("/subscriptions", getUserSubscriptions);

module.exports = router;
