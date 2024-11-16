// OrderCard.tsx
import React from "react";
import { Order } from "@/models/order";
import Image from "next/image";
import Restaurant from "@/models/restaurant";
import { useAppSelector } from "@/redux/store";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const restaurant: Restaurant | undefined = useAppSelector((state) =>
    state.restaurant.restaurants.find((r) => r._id === order.restaurantId)
  );
  return (
    <div className="flex m-2 bg-white border w-auto border-gray-200 rounded-start-3 rounded-end-5 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-8">
      <Image
        className="object-cover w-full rounded-start-3 h-full hidden md:block md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={restaurant ? restaurant.profilePhoto : ""}
        alt={"Restaurant Photo"}
        width={100}
        height={100}
      />

      <div className="flex flex-col p-4 leading-normal">
        <input type="hidden" id="hiddenInput" value={order._id} />
        <h5 className="mb-2 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {order.restaurantName}
        </h5>{" "}
        <p className="mb-1 text-xs md:text-sm lg:text-base font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Customer Name:</span> {order.customerName}
        </p>
        <p className="mb-1 text-xs md:text-sm lg:text-base font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Phone Number:</span>{" "}
          {order.customerPhoneNumber}
        </p>
        <p className="mb-1 text-xs md:text-sm lg:text-base font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Order Status:</span> {order.status}
        </p>
        <p className="mb-1 text-xs md:text-sm lg:text-base font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Final Amount:</span> $
          {order.finalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
