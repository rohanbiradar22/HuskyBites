import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FoodItem from "@/models/foodItem";
import Title from "./Title";
import AddToCartButton from "./Restaurant/AddToCartButton";
import Image from "next/image";

const FoodCard: React.FC<{
  foodItem: FoodItem;
  foodQuantity: number;
  addButtonIsVisible: boolean;
}> = ({ foodItem, foodQuantity, addButtonIsVisible }) => {
  return (
    <Card className="border h-[90%] w-full flex flex-col align-content-center  rounded-5 py-3 px-2 m-3 border-gray-200 shadow-md hover:shadow-lg transition duration-300">
      {/* food item image */}
      <div className="flex w-full justify-center">
        <CardMedia
          sx={{ height: 200, width: 300 }}
          className="rounded-md mx-3 transform transition-transform hover:scale-110"
          image={
            typeof foodItem?.image === "string"
              ? foodItem.image
              : "/default-image.jpg"
          }
          title={foodItem.name}
        />
      </div>
      <CardContent className="flex w-full justify-between">
        <div className="flex flex-col mx-2 w-full align-content-between">
          {/* restaurant title and rating */}
          <div className="flex justify-content-between align-content-between gap-3">
            <Typography className="whitespace-pre-line" variant="h5">
              {foodItem.name}
            </Typography>
            {/* <Title title={foodItem.name} variant="h5"></Title> */}
            <div className="flex align-center justify-content-center">
              <div className="p-1">
                <Image
                  width={20}
                  height={20}
                  src="https://img.icons8.com/color/48/rating-circled.png"
                  alt="rating-circled"
                />
              </div>
              <div className="form-control-color">{foodItem.rating}</div>
            </div>
          </div>
          {/* restaurant price */}
          <div className="flex w-full justify-between ">
            <Typography
              variant="body2"
              color="text.secondary"
              className="food-price"
            >
              ${foodItem.price.toFixed(2)}
            </Typography>
          </div>
        </div>
      </CardContent>
      {/* add to cart button */}
      <div className="flex w-full justify-center">
        {addButtonIsVisible ? (
          <AddToCartButton
            foodItem={foodItem}
            foodItemQuantity={foodQuantity}
          />
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default FoodCard;
