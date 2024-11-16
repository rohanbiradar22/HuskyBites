"use client"
import React from "react";
import Title from "@/components/Title";
import PizzaCanvas from "@/components/Restaurant/Pizza";
import { Button } from "@mui/material";
import { buttonStyle } from "@/components/AuthenticationForms/formStyles";
import { useRouter } from "next/navigation";

// individual orders page 
const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const navigateToHomePage = () => {
    router.push("/restaurants");
  };

  return (
    <div className="text-center">
      <Title title="Your order has been placed successfully." variant="h3" />
      <p>
        Congratulations! You&apos;ve successfully embarked on a journey to flavor town. Your order is on its way,
        prepared with love and a dash of magic.
      </p>
      <PizzaCanvas></PizzaCanvas>
      <div>
        <Button variant="contained" style={buttonStyle} onClick={navigateToHomePage}>
          Back to Food Paradise
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
