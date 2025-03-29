const mongoose = require("mongoose");
const AuctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please enter title"],
    },
    description: {
      type: String,
      required: [true, "please enter description"],
    },
    link: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const AuctionModel = mongoose.model("Auction", AuctionSchema);
module.exports = AuctionModel;