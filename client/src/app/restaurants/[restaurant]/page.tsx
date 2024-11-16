"use client";
import FoodCard from "@/components/FoodCard";
import { useEffect, useState } from "react";
import * as React from "react";
import CoverImage from "@/components/CoverImage";
import FoodItem from "@/models/foodItem";
import Restaurant from "@/models/restaurant";
import Title from "../../../components/Title";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import { useAppSelector } from "@/redux/store";

const baseUrl = "http://localhost:8080/restaurant";

// restaurant fooditems page
const FoodList: React.FC = () => {
  const params = useParams();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const restaurant: Restaurant | undefined = useAppSelector((state) =>
    state.restaurant.restaurants.find((r) => r._id === params.restaurant)
  );

  const userCart = useAppSelector(state => state.cart.cart);

  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const addButtonIsVisible = user ? true : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl}/${params.restaurant}/foodItems/all`
        );
        const data = await response.json();
        setFoodItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurant?.foodItems]);

  const getCartQuantity = (id: any) => {

    for(let i = 0; i < userCart.length ; i++){
      if(id === userCart[i].foodItem._id){
        return userCart[i].quantity
      }
    }

    return 0;
  }

  return (
    <div className="flex justify-center w-full">
      {isLoading ? (
        <div className="h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full -m-14">
          <div className="w-full">
            {restaurant && (
              <CoverImage
                src={restaurant.profilePhoto}
                alt="Restaurant cover image"
              />
            )}
          </div>
          <div className="flex flex-col w-full lg:p-10">
            {restaurant?.name && (
              <div className="flex justify-content-between items-center py-2">
                <div className="restaurant-name-header">{restaurant.name}</div>
                {/* <Title title={restaurant.name + " "} variant={"h2"}></Title> */}
                <div className="flex">
                  <span className="border border-dark-subtle border-4 text-bg-danger rounded-full text-2xl p-2">
                    {restaurant.rating}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-wrap justify-content-between justify-start w-full">
                {foodItems.map((foodItem) => (
                  <div key={foodItem._id} className="w-[24rem] flex-wrap ">
                    <FoodCard
                      key={foodItem._id}
                      foodItem={foodItem}
                      foodQuantity={getCartQuantity(foodItem._id)}
                      addButtonIsVisible={addButtonIsVisible}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
