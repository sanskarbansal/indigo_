import { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import "./Notifications.css";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("/notifications"); // Adjust this endpoint as per your backend
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul className="notifications-list">
                    {notifications.map((notification) => (
                        <li key={notification._id} className="notification-item">
                            <p>
                                <strong>Flight ID:</strong> {notification.flight_id}
                            </p>
                            <p>
                                <strong>Message:</strong> {notification.message}
                            </p>
                            <p>
                                <strong>Timestamp:</strong> {new Date(notification.timestamp).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
