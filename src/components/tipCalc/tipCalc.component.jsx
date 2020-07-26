import React, { useState, useEffect } from "react";
import { Rating, Input, Label, Divider, Segment } from "semantic-ui-react";
import CountUp from "react-countup";

const CalculateTip = ({ ratingSent }) => {
  var [amount, setAmount] = useState("");
  var [rating, setRating] = useState(0);
  var [tipPerc, setTipPerc] = useState("");
  var [tip, setTip] = useState("");

  useEffect(() => {
    switch (true) {
      case rating === 1:
        setTipPerc(0.1);
        break;
      case rating === 2:
        setTipPerc(0.12);
        break;
      case rating === 3:
        setTipPerc(0.15);
        break;
      case rating === 4:
        setTipPerc(0.18);
        break;
      case rating === 5:
        setTipPerc(0.2);
        break;
      default:
        setTipPerc(0);
    }
    setTip(amount * tipPerc);
  }, [amount, tipPerc, rating]);

  const handleRating = (e, { rating }) => {
    setRating(rating);
    ratingSent(rating);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-evenly",
        textShadow: "2px 4px 3px rgba(0, 0, 0, 0.3)",
      }}
    >
      <span style={{ fontSize: "6rem", marginBottom: "1rem" }}>
        <CountUp end={Math.round(tip)} prefix="$" />
      </span>
      <span>
        Recommended Tip <em>({tipPerc * 100}%)</em>
      </span>

      <Segment basic style={{ display: "flex", flexDirection: "column" }}>
        <Input
          labelPosition="right"
          type="number"
          placeholder="Check Amount"
          value={amount || ""}
          onChange={(e) =>
            setAmount(Math.round(e.target.value.slice(0, e.target.maxLength)))
          }
          maxLength="6"
        >
          <Label basic>$</Label>
          <input />
          <Label>.00</Label>
        </Input>
        <span>
          <em>Enter Check Amount</em>
        </span>

        <Divider horizontal style={{ color: "rgb(235, 235, 235)" }}>
          And
        </Divider>
        <span style={{ marginBottom: ".5rem" }}>
          <em>Rate Your Experience</em>
        </span>
        <Rating
          maxRating={5}
          defaultRating={0}
          icon="star"
          size="massive"
          onRate={handleRating}
        />
      </Segment>
    </div>
  );
};

export default CalculateTip;
