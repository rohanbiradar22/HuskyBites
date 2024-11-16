import * as React from "react";
import "./AdminDashboard.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useAppSelector } from "@/redux/store";

const AdminDashboard = () => {
  // Get admin state from the Redux store
  const adminState = useAppSelector((state) => state.admin);

  // Calculate total revenue based on orders
  const calculateRevenue = () => {
    return adminState.orders
      .reduce((acc, currentOrder) => acc + currentOrder.finalAmount, 0)
      .toFixed(2);
  };

  return (
    <div className="flex flex-col">
      <div className="text-3xl my-2">
        <span className="font-bold">Hi Admin 👋, </span>&nbsp;
        <span className="text-xl mt-2">Welcome to Husky Bites</span>
      </div>

      <div className="card-container">
        <div className="card purple">
          <div>
            <h2>{adminState.orders.length}</h2>
            <h4>Total Orders</h4>
          </div>
          <div>
            <ShoppingCartIcon sx={{ fontSize: 80 }} />
          </div>
        </div>

        <div className="card pink">
          <div>
            <h2>{adminState.users.length}</h2>
            <h4>Total Users</h4>
          </div>
          <div>
            <PersonIcon sx={{ fontSize: 80 }} />
          </div>
        </div>

        <div className="card green">
          <div>
            <h2>{adminState.restaurants.length}</h2>
            <h4>Total Restaurants</h4>
          </div>
          <div>
            <RamenDiningIcon sx={{ fontSize: 80 }} />
          </div>
        </div>

        <div className="card yellow">
          <div>
            <h2>$ {calculateRevenue()}</h2>
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

export default AdminDashboard;
