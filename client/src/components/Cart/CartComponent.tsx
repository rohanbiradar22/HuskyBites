"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, useAppSelector } from "../../redux/store";
import FoodItem from "@/models/foodItem";
import FoodCard from "../FoodCard";
import OrderSummary from "../OrderSummary/OrderSummary";
import Spinner from "../Spinner/Spinner";

const CartComponent: React.FC = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.cart);
  const cartItemsLoading = useAppSelector(
    (state: RootState) => state.cart.loading
  );

  return (
    <>
      {cartItemsLoading ? (
        <Spinner />
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <h1 className="text-center font-semibold mb-2 vh-100">
              Your cart is empty
            </h1>
          ) : (
            <>
              <h1 className="text-center font-semibold mb-2">Cart Summary</h1>
              <div className="flex justify-between flex-wrap m-5">
                <div className="flex-grow-1">
                  {cartItems.map((cartItem) => (
                    <div
                      key={cartItem.foodItem._id}
                      className="flex w-full justify-content-center"
                    >
                      <div className="w-[70%]">
                        <FoodCard
                          key={cartItem.foodItem._id}
                          foodItem={cartItem.foodItem}
                          foodQuantity={cartItem.quantity}
                          addButtonIsVisible={true}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-lg-shrink-0">
                  <div>
                    <OrderSummary />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CartComponent;
