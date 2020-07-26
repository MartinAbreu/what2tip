import React from "react";
import { useState } from "react";
import "./App.css";
import ReviewCard from "./components/reviews/reviews.component";
import CalculateTip from "./components/tipCalc/tipCalc.component";
import { Icon, Header } from "semantic-ui-react";

function App() {
  var [tipRating, setTipRating] = useState("");

  const handleRating = (e) => {
    setTipRating(e);
  };
  return (
    <div className="App">
      <Header
        as="h6"
        style={{ color: "rgb(235, 235, 235)", margin: "2rem 0 0 2rem" }}
      >
        <Icon name="check" size="massive" />
        <Header.Content>
          WHAT 2 TIP
          <Header.Subheader style={{ color: "rgb(235, 235, 235)" }}>
            Tip Suggestion
          </Header.Subheader>
        </Header.Content>
      </Header>
      <CalculateTip ratingSent={handleRating} />
      <ReviewCard getRating={tipRating} />
    </div>
  );
}

export default App;
