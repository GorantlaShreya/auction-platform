import React from "react";
import { useNavigate } from "react-router-dom";
import Bidding from './Bidding'; // Importing Bidding component
import "./style.css";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Auction Platform</h1>

      <div className="button-container">
        <button onClick={() => navigate("/home")} className="nav-btn">Home</button>
        <button onClick={() => navigate("/services")} className="nav-btn">Services</button>
        <button onClick={() => navigate("/about")} className="nav-btn">About</button>
      </div>

      {/* Bidding Section */}
      <section className="bidding-section">
        <h2>Start Bidding Now!</h2>
        <Bidding /> {/* Add the Bidding component here */}
      </section>

      <div className="contact-footer">
        <p>Contact us at: ey@email.com</p>
      </div>
    </div>
  );
};

export default Homepage;
