import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Homepage from "./components/Homepage";
import Home from "./components/Home";
import Services from "./components/Services";
import About from "./components/About";
import SignIn from "./components/SignIn1";
import SignUp from "./components/SignUp1";
import AuctionList from "./components/AuctionList";
import PostAuction from "./components/PostAuction";


const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<AuctionList />} />
        <Route path="/post-auction" element={<PostAuction />} />
      </Routes>
    </Router>
  );
};


export default App;