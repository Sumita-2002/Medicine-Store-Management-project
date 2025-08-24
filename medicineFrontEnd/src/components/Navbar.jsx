// Navbar.js
import { Link, useNavigate } from "react-router-dom";
import logo from "../asset/logo.png";
import "./Navbar.css";

function Navbar({ isLoggedIn, username, setIsLoggedIn, setUsername }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Mita Medicine Store</h1>
      </div>

      <ul className="nav-links">
        {/* যদি লগইন না করা থাকে */}
        {!isLoggedIn && (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {/* যদি লগইন করা থাকে */}
        {isLoggedIn && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/medicines">MedicineList</Link></li>
            <li><Link to="/selling">Selling</Link></li>
            <li><Link to="/contact">Contact</Link>
            </li>

            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li className="welcome-msg">👋 Welcome, <strong>{username}</strong></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
