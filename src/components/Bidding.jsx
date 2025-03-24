import React, { useState, useEffect } from 'react';

const Bidding = () => {
  const [highestBid, setHighestBid] = useState(0);
  const [userBid, setUserBid] = useState('');
  const [timer, setTimer] = useState(60); 
  const placeBid = () => {
    const bid = parseFloat(userBid);
    if (bid > highestBid) {
      setHighestBid(bid);
      alert(`Bid placed successfully! Current highest bid is ₹${bid}`);
    } else {
      alert('Your bid must be higher than the current highest bid.');
    }
    setUserBid(''); 
  };

  useEffect(() => {
    if (timer === 0) {
      alert('Bidding time is up!');
    } else {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval); 
    }
  }, [timer]);

  return (
    <div>
      <h2>Bidding for Auction</h2>
      <p>Current Highest Bid: ₹{highestBid}</p>
      <p>Time Remaining: {timer} seconds</p>

      <div>
        <input
          type="number"
          value={userBid}
          onChange={(e) => setUserBid(e.target.value)}
          placeholder="Enter your bid"
        />
        <button onClick={placeBid}>Place Bid</button>
      </div>

      {timer === 0 && <h3>Bidding has ended!</h3>}
    </div>
  );
};

export default Bidding;
