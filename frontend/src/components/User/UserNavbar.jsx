import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-brand">Indigo</div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">
                Flights
            </Link>
            <Link to="/notifications" className="nav-link">
                Notifications
            </Link>
        </div>
    </nav>
);

export default Navbar;
