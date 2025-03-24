import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/MyNavbar";
import Homepage from "./components/Homepage"; 
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn1";  
import SignUp from "./components/SignUp1";  
import AuctionList from "./components/AuctionList";  // ✅ Import AuctionList

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auctions" element={<AuctionList />} />  {/* ✅ Add AuctionList Route */}
      </Routes>
    </Router>
  );
}

export default App;
