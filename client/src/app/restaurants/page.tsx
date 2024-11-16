"use client";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
// import Spinner from "@/components/Spinner/Spinner";
import "./restaurant.scss";
import * as restaurantService from "@/services/restaurant-service";
import Restaurant from "@/models/restaurant";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { User } from "@/models/auth";
import { InputBase, Paper, IconButton, CircularProgress, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getRestaurants } from "@/redux/actions/restaurant-actions";
import Footer from "@/components/Footer/Footer";

// restaurant mainpage
const RestaurantPage: React.FC = () => {
  // const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  const user: User | null = useAppSelector((state) => state.auth.user);

  const dispatch: AppDispatch = useDispatch();
  const restaurants = useAppSelector((state) => state.restaurant.restaurants);
  const loading = useAppSelector((state) => state.restaurant.loading);
  const error = useAppSelector((state) => state.restaurant.error);

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(getRestaurants());
    }
  }, [restaurants, dispatch]);

  // Update filtered restaurants based on search query
  useEffect(() => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurants]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center text-center mb-10 justify-between flex-wrap">
          <div className="text-3xl my-2">
            <span className="font-bold">Hi {user?.firstName} 👋, </span>&nbsp;
            <span className="text-xl mt-2">Which restaurant will you try today?</span>
          </div>

          {/* Material-UI Search Bar */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for a restaurant"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        {/* Display Filtered Restaurants */}
        <Row className="restaurant_container">
          {filteredRestaurants.map((restaurant: Restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
              <Link href={`/restaurants/${restaurant._id}`}>
                <RestaurantCard restaurant={restaurant}></RestaurantCard>
              </Link>
            </Col>
          ))}
          {loading && (
            <div>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
              </Box>
            </div>
          )}
          {!filteredRestaurants.length && !loading && (
            <div>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <p className="text-2xl">Oops...! No Restaurants found</p>
              </Box>
            </div>
          )}
        </Row>
      </div>
      {/* ... (existing content) */}
    </>
  );
};

export default RestaurantPage;
