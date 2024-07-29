import { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import FlightCard from "./FlightCard";
import "./Flights.css";

const Flights = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("/flights");
                setFlights(response.data);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };

        fetchFlights();
    }, []);

    const handleSubscribe = async (flightId) => {
        try {
            const { data } = await axios.post(`/api/user/subscribe/${flightId}`);
            setFlights(data);
        } catch (error) {
            console.error("Error subscribing to flight:", error);
        }
    };

    const handleUnsubscribe = async (flightId) => {
        try {
            const { data } = await axios.post(`/api/user/unsubscribe/${flightId}`);
            setFlights(data);
        } catch (error) {
            console.error("Error unsubscribing from flight:", error);
        }
    };

    return (
        <div className="flights">
            {flights.map((flight) => (
                <FlightCard key={flight._id} flight={flight} onSubscribe={handleSubscribe} onUnsubscribe={handleUnsubscribe} />
            ))}
        </div>
    );
};

export default Flights;
