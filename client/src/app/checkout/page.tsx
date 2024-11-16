"use client";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import AddressForm from "../../components/AddressForm/AddressForm";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import "./checkout.scss";
import Address from "@/models/address";
import { CardDetails, Order, PaymentDetails } from "@/models/order";
import { useRouter } from "next/navigation";
import { User } from "@/models/auth";
import { RootState, useAppSelector } from "@/redux/store";
import Restaurant from "@/models/restaurant";
import OrderState from "@/models/orderSummary";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/reducers/cartSlice";


// checkout form
const CenteredCard: React.FC = () => {
  const dispatch = useDispatch();
  const steps = ["Delivery address", "Payment details"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [AddressFormData, setFormData] = React.useState<Address | null>(null);
  const [PaymentFormData, setPaymentFormData] =
    React.useState<CardDetails | null>(null);

  const [newOrder, setNewOrder] = React.useState<Order | null>(null);

  const user: User | null = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state: RootState) => state.cart.cart);
  const restaurant: Restaurant | undefined = useAppSelector((state) => {
    return cartItems.length !== 0
      ? state.restaurant.restaurants.find(
          (r) => r._id === cartItems[0].foodItem.restaurantId
        )
      : undefined;
  });
  const orderSummary: OrderState = useAppSelector(
    (state: RootState) => state.order
  );
  const router = useRouter();

  const handleNext = (data: Address) => {
    setFormData(data);
    setActiveStep(activeStep + 1);
  };

  const onPlaceOrder = async (formData: CardDetails) => {
    // on place order
    setPaymentFormData(formData);

    let addressDetails: Address;
    let cardDetails: CardDetails;
    let paymentDetail: PaymentDetails;
    let currentOrder: Order;
    if (AddressFormData && formData && user) {
      addressDetails = {
        addressLine: AddressFormData.addressLine,
        city: AddressFormData.city,
        state: AddressFormData.state,
        country: AddressFormData.country,
        zipCode: AddressFormData.zipCode,
      };

      cardDetails = {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cardHolderName: formData.cardHolderName,
        cvv: formData.cvv,
      };

      paymentDetail = {
        cardUsed: cardDetails,
        cash: 0,
      };

      const orderItems = cartItems.map((cartItem) => {
        return {
          foodItem: cartItem.foodItem,
          quantity: cartItem.quantity, // Assuming cartItem has a quantity property
        };
      });

      const orderFinalAmount = (
        orderSummary.orderTotal +
        orderSummary.tax +
        orderSummary.delivery
      ).toFixed(2);
      currentOrder = {
        userId: user._id,
        customerName: `${user.firstName} ${user.lastName}`,
        customerPhoneNumber: user.phone,
        orderItems: orderItems,
        promoCode: "",
        status: "Placed",
        restaurantId: restaurant ? restaurant._id : "",
        paymentDetails: paymentDetail,
        finalAmount: parseFloat(orderFinalAmount),
        restaurantName: restaurant ? restaurant.name : "",
        specialInstructions: "none",
        ETA: "2023-11-20T08:30:00.000+00:00",
        deliveredIn: "",
        tip: 0.05 * parseFloat(orderFinalAmount),
        deliveryExecutiveId: "",
      };

      try {
        const response = await fetch("http://localhost:8080/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentOrder),
        });

        if (response.ok) {
          console.log("Order placed successfully:", response);
        } else {
          console.log("Order :Failed", response);
        }

        const responseData = await response.json();

        setNewOrder(currentOrder);
        dispatch(clearCart());
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }

    const orderStatus = null;

    if (typeof window !== "undefined") {
      router.push("/myorder/current");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNextClick = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle "Place order" here
    }
  };

  useEffect(() => {
    // console.log("Address Form Data:", AddressFormData);
  }, [AddressFormData]);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm onNext={handleNext} />;
      case 1:
        return <PaymentForm onPlaceOrder={onPlaceOrder} onBack={handleBack} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <div className="checkout-container-div">
        <Card className="checkout-card">
          <CardContent>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {getStepContent(activeStep)}
              {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNextClick}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Place order
                  </Button>
                )}
              </Box> */}
            </React.Fragment>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CenteredCard;
