const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/subscribe", notificationController.subscribeToNotifications);
router.delete("/unsubscribe", notificationController.unsubscribeFromNotifications);
router.post("/send", notificationController.sendNotification);

module.exports = router;
