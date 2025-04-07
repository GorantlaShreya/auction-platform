import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to the Auction Platform</h1>
      <div className="d-flex justify-content-center mt-4 gap-3">
        <Button variant="primary" as={Link} to="/home">Home</Button>
        <Button variant="primary" as={Link} to="/services">Services</Button>
        <Button variant="primary" as={Link} to="/about">About</Button>
        <Button variant="primary" as={Link} to="/post-auction">Post Auction</Button>
      </div>
      <p className="mt-4 text-muted">Contact us at: ey@email.com</p>
    </div>
  );
};

export default Homepage;
