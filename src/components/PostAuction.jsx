import React, { useState } from "react";
import axios from "axios";

const PostAuction = () => {
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    originalPrice: "",
    closingTime: ""
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/post-auction", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Auction posted successfully!");
      setForm({
        itemName: "",
        description: "",
        originalPrice: "",
        closingTime: ""
      });
    } catch (error) {
      console.error("Error posting auction:", error);
      alert("Failed to post auction.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="border rounded p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center">Post a New Auction</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="itemName"
              className="form-control"
              value={form.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Starting Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              className="form-control"
              value={form.originalPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Closing Time</label>
            <input
              type="datetime-local"
              name="closingTime"
              className="form-control"
              value={form.closingTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Post Auction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAuction;
