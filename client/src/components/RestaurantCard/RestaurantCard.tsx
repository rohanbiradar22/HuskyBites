import React from "react";
import { Card } from "react-bootstrap";
import { CardContent, CardMedia, Typography } from "@mui/material";
import "./restaurant-card.scss";
import Restaurant from "@/models/restaurant";

const Products: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const commonThemeOptions = {
    typography: {
      fontFamily: "Roboto, sans-serif", // Set your preferred font family
    },
  };

  return (
    <>
      {/* <h1>Restaurent card</h1> */}
      <Card
        className="restaurant-card shadow-md hover:shadow-lg transition-transform hover:scale-110"
        style={{
          color: "black",
          backgroundColor: "white",
        }}
      >
        {/* Image Section */}
        <CardMedia
          component="img"
          height="140" // Set the desired height for the image section
          image={restaurant.profilePhoto} // Replace with your image path
          alt="Your Image Alt Text"
          className="restaurant-image"
        />
        {/* Text Section */}
        <CardContent className="card-text-div">
          <Typography variant="h5" component="div" className="card-text">
            {/* Restaureant Name */}
            <div className="restaurant-name">{restaurant.name}</div>
            {/* Restaurant Rating */}
            <div
              className="restaurant-rating-div"
              style={{
                color: "black",
                backgroundColor: "black",
              }}
            >
              <div
                className="restaurant-rating-text"
                style={{ color: "white" }}
              >
                {restaurant.rating}
              </div>
            </div>
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Some description or text content goes here.
          </Typography> */}
        </CardContent>
      </Card>

      {/* <Card>
        <Link href={""}>
          <Card.Img src={restaurant.image} variant="top"></Card.Img>
        </Link>

        <Card.Body>
          <Link href={""}>
            <Card.Title as="div" className="restaurant-title">
              <strong>{restaurant.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Ratings
            value={restaurant.rating}
            text={`${restaurant.numReviews} reviews`}
            color={""}
          />
          </Card.Text>
          <Card.Text as="h3">${restaurant.price}</Card.Text>
        </Card.Body>
      </Card> */}
    </>
  );
};

export default Products;
