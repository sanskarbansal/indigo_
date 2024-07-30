// const socketIo = require("socket.io");
const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    if (io) {
        console.warn("Socket.IO is already initialized!");
        return io;
    }

    io = new Server(server, { cors: { origin: "http://localhost:5173" } });

    io.on("connection", (socket) => {
        console.log("a user connected");

        // Handle subscription to flights
        socket.on("flightUpdates", () => {
            socket.join("flightUpdates");
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    return io;
};

const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized!");
    }
    return io;
};

async function sendFlightUpdate({ status, currentFlight, updatedFlight }) {
    // Determine which fields were updated and generate messages
    let messageText = "";

    if (status !== currentFlight.status) {
        messageText =
            updatedFlight.status === "Cancelled"
                ? `Flight ${updatedFlight.flight_id} has been cancelled`
                : updatedFlight.status === "Delayed"
                ? `Flight ${updatedFlight.flight_id} has been delayed to ${updatedFlight.scheduled_departure}`
                : `Flight ${updatedFlight.flight_id} is On Time`;
    } else if (updatedFlight?.departure_gate !== currentFlight.departure_gate) {
        messageText = `Departure Gate of Flight ${updatedFlight.flight_id} has been changed to ${updatedFlight.departure_gate}`;
    } else if (updatedFlight?.arrival_gate !== currentFlight.arrival_gate) {
        messageText = `Arrival Gate of Flight ${updatedFlight.flight_id} has been changed to ${updatedFlight.arrival_gate}`;
    }

    // Emit the message if there's any change
    if (messageText) {
        io?.to("flightUpdates").emit("message", { text: messageText });
    }
}

module.exports = {
    initSocket,
    getIo,
    sendFlightUpdate,
};
