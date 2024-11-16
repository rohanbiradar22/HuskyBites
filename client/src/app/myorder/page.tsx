"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/models/order";
import OrderCard from "@/components/CustomerOrder/OrderCard";
import { User } from "@/models/auth";
import { useAppSelector } from "@/redux/store";
import { Modal } from "react-bootstrap";


// orders main page
const OrderDetails: React.FC = () => {
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user: User | null = useAppSelector((state) => state.auth.user);
  const userId = user ? user._id : null;
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [orderToShow, setOrderToShow] = useState<Order>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:8080/orders/search?page=1&pageSize=10&userId=" +
            userId
        );
        const data = await response.json();
        setPastOrders(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handlePopupClose = () => setShouldShowPopup(false);
  function handleOrderCardClick(order: any): void {
    setOrderToShow(order);
    setShouldShowPopup(true);
  }

  return (
    <>
      <div>
        <h5 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Past Orders
        </h5>
        {isLoading && <p>Loading...</p>}
        {!isLoading && pastOrders.length === 0 && <p>No past orders found.</p>}
        {!isLoading && pastOrders.length > 0 && (
          <div className="flex flex-wrap justify-content-around">
            {pastOrders.map((order) => (
              <div key={order._id} onClick={() => handleOrderCardClick(order)}>
                <OrderCard key={order._id} order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        className="p-5 rounded-3 mt-2"
        show={shouldShowPopup}
        onHide={handlePopupClose}
        backdrop={"static"}
      >
        <Modal.Header className="d-flex justify-content-between">
          {orderToShow ? (
            <h4 className="fw-bold">{orderToShow.restaurantName}</h4>
          ) : (
            <h4>Restaurant Name</h4>
          )}
          <button
            className="btn btn-sm btn-close mx-3 bg-red rounded-full"
            onClick={handlePopupClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          {orderToShow ? (
            <div className="flex flex-col pb-5">
              <div className="d-flex justify-around flex-row">
                <div className="">
                  <h5>Order Items</h5>
                  <ul className="list-group">
                    {orderToShow.orderItems.map((orderItem) => (
                      <li
                        className="flex bg-light list-group-item"
                        key={orderItem._id}
                      >
                        <span className="border bg-white font-semibold p-1 mr-4 rounded-5">
                          {orderItem.quantity}
                        </span>
                        <span>{orderItem.foodItem.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5>Order Summary</h5>
                  <span>Status: {orderToShow.status}</span>
                  <br />
                  <span>Order total: ${orderToShow.finalAmount}</span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderDetails;
