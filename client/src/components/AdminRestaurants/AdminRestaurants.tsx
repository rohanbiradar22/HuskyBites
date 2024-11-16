import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "@/redux/store";
import "./admin-restaurant.scss";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { adminActions } from "@/redux/reducers/adminSlice";
import * as restaurantService from "@/services/restaurant-service";
import { toast } from "react-toastify";

interface AdminRestaurantsProps {}

const AdminRestaurants: React.FC<AdminRestaurantsProps> = ({}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const itemsPerPage = 10;
  // Redux state and dispatch
  const restaurantState = useAppSelector((state) => state.admin.restaurants);
  const dispatch = useDispatch();

  // Function to close the delete confirmation modal
  const handleCloseModal = () => {
    setSelectedRestaurant(null);
  };

  // Function to handle the restaurant deletion confirmation
  const handleDeleteConfirm = async () => {
    if (selectedRestaurant) {
      // Dispatch the deleteRestaurant action with the selected restaurant ID
      try {
        // Call the deleteRestaurantById function from the service
        await restaurantService.deleteRestaurantById(selectedRestaurant);
        toast.success("Restaurant deleted successfully!");
        dispatch(adminActions.deleteRestaurant(selectedRestaurant));
        setSelectedRestaurant(null);
      } catch (error) {
        toast.error("Error deleting restaurant");
      }
    }
  };

  // Filtered restaurant list based on search query
  const filteredRestaurants = restaurantState.filter((restaurant) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      restaurant._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      restaurant.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      restaurant.email.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

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

  // Function to handle the click on the delete button for a restaurant
  const handleDeleteClick = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
  };

  return (
    <>
      <div className="body">
        <div className="admin-header-div">
          <div className="page-header">Restaurants</div>
          <div className="search-bar">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                marginBottom: "16px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for a restaurant"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        <div className="tbl-container">
          <TableContainer component={Paper}>
            <Table className="restaurant-tbl">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">
                    Restaurant Name
                  </TableCell>
                  <TableCell className="table-header">Rating</TableCell>
                  <TableCell className="table-header">Phone Number</TableCell>
                  <TableCell className="table-header">Email</TableCell>
                  <TableCell className="table-header">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRestaurants.map((restaurant) => (
                  <TableRow key={restaurant._id} className="table-row">
                    <TableCell className="table-cell">
                      {restaurant.name}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.rating}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.phone}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.email}
                    </TableCell>
                    <TableCell className="table-cell">
                      <Button
                        className="delete-btn"
                        variant="contained"
                        onClick={() => handleDeleteClick(restaurant._id)}
                      >
                        <FaTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredRestaurants.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!selectedRestaurant} onClose={handleCloseModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this restaurant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            color="inherit"
            variant="outlined"
            className="modal-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            variant="contained"
            className="modal-delete-btn"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminRestaurants;
