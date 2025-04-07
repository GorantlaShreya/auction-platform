import React, { useEffect, useState } from "react";
import axios from "axios";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:5001/auctions");
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleBid = async (auctionId) => {
    const bid = Number(bidAmounts[auctionId]);
    if (!bid || bid <= 0) {
      alert("Enter a valid bid amount");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5001/bid/${auctionId}`,
        { bid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      fetchAuctions(); 
    } catch (error) {
      alert(error.response?.data?.message || "Error placing bid");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Auction Items</h2>
      {auctions.length === 0 ? (
        <p>No auctions available.</p>
      ) : (
        auctions.map((auction) => (
          <div key={auction._id} className="border rounded p-3 mb-3 shadow-sm">
            <h4>{auction.itemName}</h4>
            <p>{auction.description}</p>
            <p>Starting Price: ₹{auction.originalPrice}</p>
            <p>Current Bid: ₹{auction.currentBid}</p>
            <p>Ends at: {new Date(auction.closingTime).toLocaleString()}</p>

            {!auction.isClosed ? (
              <>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Enter your bid"
                  value={bidAmounts[auction._id] || ""}
                  onChange={(e) =>
                    setBidAmounts({
                      ...bidAmounts,
                      [auction._id]: e.target.value,
                    })
                  }
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleBid(auction._id)}
                >
                  Place Bid
                </button>
              </>
            ) : (
              <p className="text-danger">Auction Closed</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AuctionList;
