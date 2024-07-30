import { useState, useEffect, useContext, useMemo } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";

import axios from "../../axiosInstance";
import FlightCard from "./FlightCard";
import "./Flights.css";
import { AuthContext } from "../../AuthContext";

const socket = io("http://localhost:1337");

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [subscribedFlights, setSubscribedFlights] = useState([]);
    const { auth } = useContext(AuthContext);
    const fetchFlights = useMemo(() => {
        return async () => {
            try {
                const response = await axios.get("/flights");
                setFlights(response.data);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };
    }, []);
    useEffect(() => {
        async function fetchSubscribedFlights() {
            try {
                const response = await axios.get("/user/subscriptions");
                setSubscribedFlights(response.data.map((sub) => sub.flightId));
            } catch (error) {
                console.error("Error fetching subscribed flights:", error);
            }
        }
        if (auth?.token) {
            fetchFlights();
            fetchSubscribedFlights();
        }
    }, [auth?.token, fetchFlights]);

    useEffect(() => {
        // Subscribe to flight updates
        socket.emit("flightUpdates");

        // Listen for flight status updates
        socket.on("message", async ({ text }) => {
            toast.info(text);
            await fetchFlights();
        });

        return () => {
            socket.off("message");
        };
    }, [fetchFlights]);

    const handleSubscribe = async (flightId) => {
        try {
            await axios.post(`/user/subscribe/${flightId}`);
            setSubscribedFlights([...subscribedFlights, flightId]);
        } catch (error) {
            console.error("Error subscribing to flight:", error);
        }
    };

    const handleUnsubscribe = async (flightId) => {
        try {
            await axios.post(`/user/unsubscribe/${flightId}`);
            setSubscribedFlights(subscribedFlights.filter((sub) => flightId !== sub));
        } catch (error) {
            console.error("Error unsubscribing from flight:", error);
        }
    };

    return (
        <div className="flights">
            {flights.map((flight) => (
                <FlightCard
                    key={flight._id}
                    flight={flight}
                    onSubscribe={handleSubscribe}
                    isSubscribed={subscribedFlights.includes(flight._id)}
                    onUnsubscribe={handleUnsubscribe}
                />
            ))}
        </div>
    );
};

export default Flights;
