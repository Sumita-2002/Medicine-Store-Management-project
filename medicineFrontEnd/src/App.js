import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Billing from "./pages/Billing";
import Contact from "./pages/Contact";
import MedicineList from "./pages/MedicineList";
import Footer from "./components/Footer";

import SellingPage from "./pages/SellingPage";

// 🔐 Protected route for logged-in users only
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("loggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    const storedLogin = localStorage.getItem("loggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    setIsLoggedIn(storedLogin);
    setUsername(storedUsername);
  }, []);

  return (
    <Router>
      {/* ✅ Navbar shows based on login status */}
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />

      <div className="content">
        <Routes>
          {/* 🔐 Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medicines"
            element={
              <ProtectedRoute>
                <MedicineList />
              </ProtectedRoute>
            }
          />

          {/* 🔓 Public Routes */}
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            }
          />
          <Route path="/register" element={<Register />} />

           <Route
            path="/selling"
            element={
              <ProtectedRoute>
                <SellingPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>

      {/* ⬇️ Always shown footer */}
      <Footer />
    </Router>
  );
}

export default App;
