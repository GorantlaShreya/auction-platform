import React from "react";

const AuctionList = () => {
  const auctions = [
    { id: 1, title: "Vintage Watch", price: "$120" },
    { id: 2, title: "Antique Painting", price: "$250" },
    { id: 3, title: "Luxury Handbag", price: "$500" },
  ];

  return (
    <div className="center-container">
      <h1>Available Auctions</h1>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <strong>{auction.title}</strong> - {auction.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
