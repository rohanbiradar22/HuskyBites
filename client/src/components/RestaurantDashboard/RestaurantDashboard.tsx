import React from "react";
import "./restaurant-dashboard.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useAppSelector } from "@/redux/store";

type RestaurantDashboardProps = {
  totalFoodItems: number;
  totalOrders: number;
  totalRevenue: number;
};

const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({
  totalFoodItems,
  totalOrders,
  totalRevenue,
}) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col">
      <div className="text-3xl my-2">
        <span className="font-bold">Hi {user?.name} 👋, </span>&nbsp;
        <span className="text-xl mt-2">Welcome to Husky Bites</span>
      </div>

      <div className="card-container">
        <div className="card purple">
          <div>
            <h2>{totalOrders}</h2>
            <h4>Total Orders</h4>
          </div>
          <div>
            <ShoppingCartIcon sx={{ fontSize: 80 }} />
          </div>
        </div>

        <div className="card green">
          <div>
            <h2>{totalFoodItems}</h2>
            <h4>Total Dishes</h4>
          </div>
          <div>
            <RamenDiningIcon sx={{ fontSize: 80 }} />
          </div>
        </div>

        <div className="card yellow">
          <div>
            <h2>$ {totalRevenue.toFixed(2)}</h2>
            <h4>Total Revenue</h4>
          </div>
          <div>
            <MonetizationOnIcon sx={{ fontSize: 80 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
