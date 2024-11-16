import React, { useEffect, useState } from "react";
import "./restaurant-orders.scss";

import * as orderService from "@/services/order-service";
import { Order, OrderItem } from "@/models/order";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  Button,
  Modal,
  Backdrop,
  Fade,
  List,
  ListItem,
  ListItemText,
  InputBase,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

interface RestaurantOrdersProps {
  restaurantId: string;
  ordersData: Order[];
}

const RestaurantOrders: React.FC<RestaurantOrdersProps> = ({
  restaurantId,
  ordersData,
}) => {
  const [orders, setOrders] = useState<Order[]>([...ordersData]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const itemsPerPage = 10;

  // Sort orders by latest createdDateTime
  useEffect(() => {
    const sortedOrders = [...ordersData].sort((a, b) => {
      // Map status to a numerical priority
      const statusPriority = {
        Placed: 1,
        Cooking: 2,
        Delivered: 3,
      } as Record<string, number>;

      // Get the priority for each order status
      const priorityA = statusPriority[a.status] || 0;
      const priorityB = statusPriority[b.status] || 0;

      // If priorities are different, sort by status priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If priorities are the same, sort by creation date
      const dateA = a.createdDateTime ? new Date(a.createdDateTime) : null;
      const dateB = b.createdDateTime ? new Date(b.createdDateTime) : null;

      if (dateA && dateB) {
        return (dateA as any) - (dateB as any);
      } else if (dateA) {
        return -1; // a comes first
      } else if (dateB) {
        return 1; // b comes first
      }

      return 0; // both dates are undefined
    });

    setOrders(sortedOrders);
  }, [ordersData]);

  const handleStatusChange = (event: any, orderId: string) => {
    const updatedOrders = orders.map((order) =>
      order._id === orderId
        ? { ...order, status: event.target.value as string }
        : order
    );
    setOrders(updatedOrders);
  };

  const handleUpdateStatus = async (orderId: string) => {
    try {
      const orderToUpdate = orders.find((order) => order._id === orderId);

      if (orderToUpdate) {
        const updatedOrder = await orderService.updateOrder(orderId, {
          status: orderToUpdate.status,
        });

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  const handleViewOrderItems = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      order._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      order.customerName.toLowerCase().includes(lowerCaseSearchQuery) ||
      order.status.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = filteredOrders.slice(startIndex, endIndex);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newSize = event.target.value as number;
    setPageSize(newSize);
    setPage(1);
  };

  return (
    <div>
      <div className="restaurant-header-div">
        <div className="page-header">Orders</div>
        <div>
          <div className="search-bar">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
              onSubmit={handleSearchSubmit}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for an order"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
      </div>
      <div className="tbl-container">
        <TableContainer component={Paper}>
          <Table className="orders-tbl">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Order ID</TableCell>
                <TableCell className="table-header">Customer Name</TableCell>
                <TableCell className="table-header" align="center">
                  Final Amount
                </TableCell>
                <TableCell className="table-header" align="center">
                  Order Items
                </TableCell>
                <TableCell className="table-header" align="center">
                  Status
                </TableCell>
                <TableCell className="table-header" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell align="center">$ {order.finalAmount}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewOrderItems(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Select
                      className="status-dropdown"
                      value={order.status}
                      onChange={(event: any) =>
                        handleStatusChange(event, order._id ? order._id : "")
                      }
                    >
                      <MenuItem value="Placed">Placed</MenuItem>
                      <MenuItem value="Cooking">Cooking</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleUpdateStatus(order._id ? order._id : "")
                      }
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal} closeAfterTransition>
        <Fade in={isModalOpen}>
          <div className="order-modal-content">
            <h2>Order Items</h2>
            {selectedOrder && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.orderItems.map((item: OrderItem) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.foodItem.name}</TableCell>
                        <TableCell align="center">
                          {item.foodItem.price} $
                        </TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <div className="action-btn-div">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Okay
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredOrders.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </div>
  );
};

export default RestaurantOrders;
