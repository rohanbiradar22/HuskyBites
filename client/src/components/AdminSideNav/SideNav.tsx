import React, { useState } from "react";
import "./side-nav.scss";
import HomeIcon from "@mui/icons-material/Home";
import { FaUsers, FaUtensils, FaShoppingCart } from "react-icons/fa";
import SidebarDataItem from "@/models/types";
import { MdOutlineMenuBook } from "react-icons/md";

interface SidebarProps {
  onSelect: (selected: string) => void;
  sidebarData: SidebarDataItem[];
}

const SideNav: React.FC<SidebarProps> = ({ onSelect, sidebarData }) => {
  // Initialize 'activePage' with 'Home'
  const [activePage, setActivePage] = useState("Home");

  const handleSelect = (val: string) => {
    setActivePage(val);
    onSelect(val);
  };

  return (
    <>
      <div className="side-nav">
        <ul className="side-bar-list">
          {sidebarData.map((val: SidebarDataItem, key: number) => {
            const isActive = val.title === activePage;
            return (
              <li
                className={`row ${isActive ? "active" : ""}`}
                key={key}
                onClick={() => handleSelect(val.title)}
              >
                <div className="list-item">
                  &nbsp;&nbsp;
                  {val.title === "Home" && <HomeIcon />}
                  {val.title === "Users" && <FaUsers />}
                  {val.title === "Restaurants" && <FaUtensils />}
                  {val.title === "Menu" && <MdOutlineMenuBook />}
                  {val.title === "Orders" && <FaShoppingCart />}
                  &nbsp; &nbsp;{val.title}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideNav;
