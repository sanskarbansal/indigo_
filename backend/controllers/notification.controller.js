const Notification = require("../models/notification.model");
const Flight = require("../models/flight.model");

const createNotification = async (req, res) => {
    try {
        const { flight_id, message, method, recipient } = req.body;
        console.log("FlightID", flight_id);
        const flight = await Flight.findById(flight_id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        for (let r of recipient) {
            await Notification.create({
                flight_id,
                message,
                method,
                recipient: r,
            });
        }

        res.status(201).json({ message: "Notification created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = (await Notification.find({ recipient: req.user._id }).sort({ updatedAt: -1 }).populate("flight_id", "flight_id")).map((f) => ({
            timestamp: f.updatedAt,
            flight_id: f.flight_id.flight_id,
            message: f.message,
        }));
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createNotification, getNotifications };
