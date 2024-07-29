import { useState, useEffect, useContext } from "react";
import axios from "../../axiosInstance";
import FlightCard from "./FlightCard";
import "./Flights.css";
import { AuthContext } from "../../AuthContext";

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [subscribedFlights, setSubscribedFlights] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        async function fetchFlights() {
            try {
                const response = await axios.get("/flights");
                setFlights(response.data);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        }
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
    }, [auth?.token]);

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
