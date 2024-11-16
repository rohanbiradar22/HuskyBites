"use client";
import AdminSideNav from "@/components/AdminSideNav/SideNav";
import React, { useEffect, useState } from "react";
import "./restaurant-home.scss";
import { RestaurantSidebarData } from "../../../components/AdminSideNav/RestaurantSideBarData";
import RestaurantDashboard from "@/components/RestaurantDashboard/RestaurantDashboard";
import RestaurantOrders from "@/components/RestaurantOrders/RestaurantOrders";
import RestaurantMenu from "@/components/RestautantMenu/RestaurantMenu";
import * as restaurantService from "@/services/restaurant-service";
import * as foodItemService from "@/services/fooditem-service";
import * as orderService from "@/services/order-service";
import FoodItem from "@/models/foodItem";
import { Order } from "@/models/order";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { restaurantActions } from "@/redux/reducers/restaurantHomeSlice";
import Spinner from "@/components/Spinner/Spinner";

interface PageProps {
  params: {
    restaurantId: string;
  };
}

// restaurant home page
const RestaurantHomePage: React.FC<PageProps> = ({ params }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");
  // const [restaurant, setRestaurant] = useState<Restaurant>();
  const [menuItems, setFoodItems] = useState<FoodItem[]>([]);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const restaurantHomeState = useAppSelector((state) => state.restaurantHome);
  const restaurantId = params.restaurantId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurantService.getRestaurantById(restaurantId);
        const foodData = await foodItemService.getFoodItems(restaurantId);
        const allOrdersData = await orderService.searchOrders(
          0,
          50,
          undefined,
          restaurantId
        );
        // setRestaurant(data);
        setOrdersData(allOrdersData);
        setFoodItems(foodData);
        dispatch(restaurantActions.restaurant({ foodData, allOrdersData }));
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateRevenue = () => {
    return restaurantHomeState.orders.reduce((acc, currentValue) => {
      return acc + currentValue.finalAmount;
    }, 0);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return (
          <RestaurantDashboard
            totalOrders={restaurantHomeState.orders.length}
            totalFoodItems={restaurantHomeState.menu.length}
            totalRevenue={calculateRevenue()}
          />
        );
      case "Menu":
        return (
          <RestaurantMenu menuItems={menuItems} restaurantId={restaurantId} />
        );
      case "Orders":
        return (
          <RestaurantOrders
            ordersData={ordersData}
            restaurantId={restaurantId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="main-div">
        {/* navbar */}
        <div className="admin-side-nav hidden sm:hidden md:block lg:block xl:block">
          <AdminSideNav
            onSelect={setSelectedComponent}
            sidebarData={RestaurantSidebarData}
          ></AdminSideNav>
        </div>
        {/* components */}
        <div className="admin-main-content">{renderSelectedComponent()}</div>
        {loading && <Spinner />}
      </div>
    </>
  );
};

export default RestaurantHomePage;
