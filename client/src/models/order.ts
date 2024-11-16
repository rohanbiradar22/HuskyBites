import FoodItem from "./foodItem";

// models for oders
export interface Order {
  _id?: string;
  userId: string;
  customerName: string;
  customerPhoneNumber: string;
  orderItems: OrderItem[];
  promoCode: string;
  status: string;
  restaurantId: string;
  paymentDetails: PaymentDetails;
  finalAmount: number;
  restaurantName: string;
  specialInstructions: string;
  ETA: string;
  deliveredIn: string;
  tip: number;
  deliveryExecutiveId: string;
  createdDateTime?: string;
}

export interface OrderItem {
  foodItem: FoodItem;
  quantity: number;
  _id?: string;
}

export interface PaymentDetails {
  cardUsed: CardDetails;
  cash?: number;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cardHolderName: string;
  cvv: string;
}
