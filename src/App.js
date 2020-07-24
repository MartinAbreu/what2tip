import React from "react";
import { useState } from "react";
import "./App.css";
import ReviewCard from "./components/reviews/reviews.component";
import CalculateTip from "./components/tipCalc/tipCalc.component";

function App() {
  var [tipRating, setTipRating] = useState("");

  const handleRating = (e) => {
    setTipRating(e);
  };
  return (
    <div className="App">
      <h1>What 2 Tip</h1>
      <CalculateTip />
      <ReviewCard />
    </div>
  );
}

export default App;
