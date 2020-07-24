import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import Collapsible from "react-collapsible";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Autocomplete from "react-google-autocomplete";

import firebaseDB from "../../utils/firebase/firebase";

const ReviewCard = () => {
  var [searchVal, setSearchVal] = useState("");
  var [restaurant, setRestaurant] = useState("");
  var [getReview, setGetReview] = useState({});

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchVal(review.restaurant.toLowerCase());
    addOrEdit(review);
    console.log(searchVal);

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

  function isObjectEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length <= 1;
  }

  return (
    <>
      <Collapsible trigger="Leave A Review">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "25%",
              height: "50%",
              alignItems: "center",
            }}
            autoComplete="off"
          >
            <Autocomplete
              apiKey={"AIzaSyASQYSS3mUiVqNhwYaKTwflC7OFwEqgQRU"}
              name="restaurant"
              value={review.restaurant}
              onChange={(e) =>
                setReview({ ...review, restaurant: e.target.value.toString() })
              }
              onPlaceSelected={(place) => {
                setReview({
                  restaurant: place.name
                    .substr(0, place.name.indexOf(","))
                    .toString()
                    .toLowerCase(),
                });
              }}
              types={["establishment"]}
              fields={["name"]}
            />
            <input
              name="name"
              value={review.name || ""}
              onChange={handleInputsVals}
              placeholder="Name"
            />
            <Rating
              name="rating"
              value={Number(review.rating) || 0}
              onChange={handleInputsVals}
            />
            <input
              type="textarea"
              name="comment"
              value={review.comment || ""}
              onChange={handleInputsVals}
              placeholder="Leave your comment"
            />
            <button type="submit" value="Send it">
              Send it
            </button>
          </form>
        </div>
      </Collapsible>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <span style={{ margin: "2rem 0 2rem 0", padding: "0 2rem" }}>
          {isObjectEmpty(getReview) ? null : (
            <span>
              See what others are saying about <br />
              <strong>{`${Capitalize(restaurant)}`}</strong>
            </span>
          )}
        </span>
        <Carousel autoPlay={3000} infinite>
          {Object.keys(getReview).map((id) => {
            return (
              <>
                <div
                  variant="outlined"
                  key={id}
                  style={{ marginBottom: "2rem" }}
                >
                  <div>
                    <h3>
                      {Capitalize(
                        getReview[id].name
                          .split(" ")
                          .slice(0, 1)
                          .join(" ")
                          .toString()
                      )}{" "}
                    </h3>
                    <p>
                      <em>{Capitalize(getReview[id].comment)}</em>
                    </p>
                    <Rating value={getReview[id].rating || ""} readOnly />
                  </div>
                </div>
              </>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default ReviewCard;
