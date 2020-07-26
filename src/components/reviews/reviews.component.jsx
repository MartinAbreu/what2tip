import React, { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import "@brainhubeu/react-carousel/lib/style.css";
import ReactCardCarousel from "react-card-carousel";

import { Button, Form, Modal, Icon, Rating, Card } from "semantic-ui-react";

import firebaseDB from "../../utils/firebase/firebase";

const API_KEY = process.env.REACT_APP_API_KEY;

const ReviewCard = () => {
  var [searchVal, setSearchVal] = useState("");
  var [restaurant, setRestaurant] = useState("");
  var [getReview, setGetReview] = useState({});
  var [modalOpen, setModalOpen] = useState(false);
  var [showCar, setShowCar] = useState(false);

  useEffect(() => {
    if (searchVal !== "") {
      firebaseDB
        .child("restaurants")
        .orderByChild("restaurant")
        .equalTo(`${searchVal.toLowerCase()}`)
        .on("value", function (snapshot) {
          if (snapshot.val() != null) {
            setGetReview({
              ...snapshot.val(),
            });
            setShowCar(true);
            console.log(snapshot);
          } else {
            setGetReview({});
          }
        });
    }
  }, [searchVal]);

  const reviewValues = {
    restaurant: "",
    name: "",
    comment: "",
    rating: "",
  };
  var [review, setReview] = useState(reviewValues);

  const handleInputsVals = (e) => {
    var { name, value } = e.target;

    setReview({
      ...review,
      [name]: `${value}`,
    });
  };

  const addOrEdit = (obj) => {
    firebaseDB.child("restaurants").push(obj, (err) => {
      setRestaurant(review.restaurant);
      if (err) {
        console.log(err);
      }
    });
    console.log("Sent to firebase " + obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchVal(review.restaurant.toLowerCase());
    addOrEdit(review);
    console.log(review);
    setModalOpen(false);

    setReview({
      restaurant: "",
      name: "",
      comment: "",
      rating: "",
    });
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      {showCar ? (
        <span>
          Check out what everyone's saying about <br />{" "}
          <strong>{Capitalize(restaurant)}</strong>
        </span>
      ) : (
        <Modal
          trigger={
            <Button
              style={{
                background: "rgb(235, 235, 235)",
                color: "rgb(64, 51, 103)",
              }}
              onClick={() => setModalOpen(true)}
            >
              Leave A Review
            </Button>
          }
          open={modalOpen}
        >
          <Modal.Header>How Was Your Experience</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Field>
                <label>Restaurant</label>
                <Autocomplete
                  apiKey={API_KEY}
                  name="restaurant"
                  value={review.restaurant}
                  onChange={(e) =>
                    setReview({
                      ...review,
                      restaurant: e.target.value.toString(),
                    })
                  }
                  onPlaceSelected={(place) => {
                    setReview({
                      restaurant: place.name
                        .substr(0, place.name.indexOf(","))
                        .toString()
                        .toLowerCase(),
                    });
                  }}
                  placeholder="Choose your location as you type"
                  types={["establishment"]}
                  fields={["name"]}
                  required
                />
              </Form.Field>
              <Form.Input
                name="name"
                label="Name"
                placeholder="First Name"
                type="text"
                value={review.name || ""}
                onChange={handleInputsVals}
                required
              />
              <Rating
                maxRating={5}
                defaultRating={0}
                icon="star"
                size="massive"
                value={review.rating}
                onRate={(e, { rating }) =>
                  setReview({ ...review, rating: rating })
                }
                required
              />
              <Form.TextArea
                name="comment"
                label="Comment"
                value={review.comment || ""}
                onChange={handleInputsVals}
                placeholder="Give us a short description of your experience"
                required
              />
              <div style={{ display: "flex" }}>
                <Form.Button primary type="submit" value="Send it">
                  <Icon name="paper plane outline"></Icon>Send it
                </Form.Button>
                <Form.Button onClick={() => setModalOpen(false)} color="red">
                  <Icon name="close"></Icon>Close
                </Form.Button>
              </div>
            </Form>
          </Modal.Content>
        </Modal>
      )}
      {showCar ? (
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "40px",
            right: "50%",
          }}
        >
          <ReactCardCarousel
            autoplay={true}
            autoplay_speed={4000}
            spread="narrow"
          >
            {Object.keys(getReview).map((id) => {
              return (
                <Card
                  key={id}
                  style={{
                    width: "20rem",
                    height: "10rem",
                    fontSize: "1rem",
                    background: "rgb(235, 235, 235)",
                  }}
                >
                  <Card.Content>
                    <Card.Header>
                      {Capitalize(
                        getReview[id].name
                          .split(" ")
                          .slice(0, 1)
                          .join(" ")
                          .toString()
                      )}
                    </Card.Header>
                    <Card.Meta>
                      <Rating
                        defaultRating={getReview[id].rating || ""}
                        maxRating={5}
                        disabled
                        icon="star"
                        size="mini"
                      />
                    </Card.Meta>
                    <Card.Description>
                      <em>"{Capitalize(getReview[id].comment)}"</em>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </ReactCardCarousel>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewCard;
