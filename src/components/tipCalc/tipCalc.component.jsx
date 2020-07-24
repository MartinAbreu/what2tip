import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";

const CalculateTip = () => {
  var [amount, setAmount] = useState("");
  var [rating, setRating] = useState(0);
  var [tipPerc, setTipPerc] = useState("");
  var [tip, setTip] = useState("");

  useEffect(() => {
    switch (true) {
      case rating === "1":
        setTipPerc(0.1);
        break;
      case rating === "2":
        setTipPerc(0.12);
        break;
      case rating === "3":
        setTipPerc(0.15);
        break;
      case rating === "4":
        setTipPerc(0.18);
        break;
      case rating === "5":
        setTipPerc(0.2);
        break;
      default:
        setTipPerc(0);
    }
    setTip(amount * tipPerc);
    console.log(rating);
    console.log(tipPerc);
  }, [amount, tipPerc, rating]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Suggested Tip:</h1>
      <span>${Math.round(tip)}</span>
      <input
        id="amount-input"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Math.round(e.target.value))}
        placeholder="Enter Check amount"
      />

      <Rating
        name="simple-controlled"
        value={rating || 0}
        onChange={(e) => setRating(e.target.value)}
        size="large"
      />
    </div>
  );
};

export default CalculateTip;
