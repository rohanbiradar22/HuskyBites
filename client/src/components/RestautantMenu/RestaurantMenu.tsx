import React, { useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  InputBase,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./restaurant-menu.scss";
import FoodItemModal from "./MenuItemModal";
import FoodItem, { FoodItemPayload } from "@/models/foodItem";
import * as foodItemService from "@/services/fooditem-service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { restaurantActions } from "@/redux/reducers/restaurantHomeSlice";

interface FoodItemsTableProps {
  menuItems: FoodItem[];
  restaurantId: string;
}

const FoodItemsTable: React.FC<FoodItemsTableProps> = ({
  menuItems,
  restaurantId,
}) => {
  const initialFoodItems = menuItems;
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState<FoodItem>({
    _id: "",
    name: "",
    foodImage: "",
    restaurantId: restaurantId,
    price: 0,
    rating: 0,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      const payload: FoodItemPayload = {
        name: formData.name,
        foodImage: formData.foodImage,
        image: formData.image,
        restaurantId: restaurantId,
        price: formData.price,
        rating: formData.rating,
      };

      const newFoodItem = await foodItemService.createFoodItem(
        restaurantId,
        payload
      );

      setFoodItems((prevItems) => [...prevItems, newFoodItem]);
      dispatch(restaurantActions.addFood(newFoodItem));
      setOpenAddModal(false);

      setFormData({
        _id: "",
        name: "",
        foodImage: "",
        image: null,
        restaurantId: restaurantId,
        price: 0,
        rating: 0,
      });

      toast.success("Food item added successfully!");
    } catch (error) {
      toast.error("Error adding food item. Please try again.");
    }
  };

  const handleEdit = async () => {
    try {
      if (editFormData) {
        const updatedFoodItem = await foodItemService.updateFoodItem(
          restaurantId,
          editFormData._id,
          formData
        );

        setFoodItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedFoodItem._id ? updatedFoodItem : item
          )
        );

        setOpenEditModal(false);
        setEditFormData(null);

        setFormData({
          _id: "",
          name: "",
          foodImage: "",
          restaurantId: restaurantId,
          price: 0,
          rating: 0,
          image: null,
        });

        toast.success("Food item updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating food item. Please try again.");
    }
  };

  const handleDeleteClick = (name: string) => {
    setEditFormData(foodItems.find((item) => item.name === name) || null);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (editFormData) {
        await foodItemService.deleteFoodItem(restaurantId, editFormData._id);
        dispatch(restaurantActions.deleteFood(editFormData._id));
        setFoodItems((prevItems) =>
          prevItems.filter((item) => item._id !== editFormData._id)
        );

        setOpenDeleteModal(false);

        toast.success("Food item deleted successfully!");
      }
    } catch (error) {
      toast.error("Error deleting food item. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleEditClick = (item: FoodItem) => {
    setEditFormData(item);
    setFormData(item);
    setOpenEditModal(true);
  };

  const handleInputChange = (
    field: string,
    value: string | number | File | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add additional logic if needed
  };

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

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedFoodItems = foodItems.slice(startIndex, endIndex);

  return (
    <div>
      <div className="restaurant-header-div">
        <div className="title-div w-30">
          <span className="page-header">Menu</span>
        </div>
        <div className="search-bar w-40">
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
              placeholder="Search Food Items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="add-food-item-btn-div w-30">
          <Button
            className="add-food-item-btn"
            variant="contained"
            color="primary"
            onClick={() => setOpenAddModal(true)}
          >
            Add Food Item
          </Button>
        </div>
      </div>

      <div className="tbl-container">
        <TableContainer component={Paper}>
          <Table className="food-items-table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Food Item Name</TableCell>
                <TableCell className="table-header">Food Image</TableCell>
                <TableCell className="table-header" align="center">
                  Food Item Price
                </TableCell>
                <TableCell className="table-header" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedFoodItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.image && (
                      <img
                        src={`${item.image}`}
                        alt="Food Item"
                        className="food-item-image"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">{item.price} $</TableCell>
                  <TableCell align="center">
                    <Button
                      className="edit-btn"
                      variant="contained"
                      onClick={() => handleEditClick(item)}
                    >
                      <FaEdit />
                    </Button>{" "}
                    <Button
                      className="delete-btn"
                      variant="contained"
                      onClick={() => handleDeleteClick(item.name)}
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

      <FoodItemModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add Food Item"
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleAdd}
      />

      <FoodItemModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Food Item"
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleEdit}
      />

      <Dialog open={openDeleteModal} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this food item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
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

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(foodItems.length / pageSize)}
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

export default FoodItemsTable;
