import { FaHeartbeat } from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="bg-effect" />
      <div className="about-card animate">
        <FaHeartbeat className="about-icon" />
        <h2 className="about-title">About Us</h2>
        <p className="about-text">
          Welcome to <strong>Medicine Store</strong> – your trusted partner in health. 
          We provide high-quality medicines, healthcare essentials, and reliable services 
          to support your wellness journey. With fast delivery and excellent customer care, 
          your health is our priority.
        </p>
        <p className="about-text">
          We believe in accessibility, care, and innovation. Every product we offer is chosen 
          with care to ensure safety, reliability, and effectiveness.
        </p>
        <div className="about-footer">
          <span>💊 Trusted | 🚀 Fast Delivery | 💖 Caring Service</span>
        </div>
      </div>
    </div>
  );
}

export default About;
