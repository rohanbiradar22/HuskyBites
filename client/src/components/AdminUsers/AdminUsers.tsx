import React, { useState } from "react";
import "./admin-users.scss";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputBase,
  IconButton,
  Stack,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { adminActions } from "@/redux/reducers/adminSlice";
import * as userService from "@/services/user-service";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

interface AdminUsersProps {}

const AdminUsers: React.FC<AdminUsersProps> = () => {
  // State to manage search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  // State to manage pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  // State to manage selected user for deletion
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Constants for pagination and table display
  const itemsPerPage = 10;
  const userState = useAppSelector((state) => state.admin.users);
  const dispatch = useDispatch();

  // Function to close the delete confirmation modal
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  // Function to handle user deletion confirmation
  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      try {
        // Call the delete service function and dispatch the action on success
        await userService.deleteUserById(selectedUser);
        toast.success("User deleted successfully!");
        dispatch(adminActions.deleteUser(selectedUser));
        setSelectedUser(null);
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
  };

  // Function to filter users based on search query
  const filteredUsers = userState.filter((user) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      user._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.firstName.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.lastName.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.email.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  // Calculate the range of users to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  // Function to handle page change in pagination
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Function to handle change in page size
  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newSize = event.target.value as number;
    setPageSize(newSize);
    setPage(1); // Reset to the first page when changing page size
  };

  // Function to handle the click on the delete button
  const handleDeleteClick = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <>
      {/* User Management UI */}
      <div className="body">
        <div className="admin-header-div">
          <div className="page-header">Users</div>
          <div className="search-bar">
            {/* Search Input */}
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
                placeholder="Search for a user"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        {/* User Table */}
        <div className="tbl-container">
          <TableContainer component={Paper}>
            <Table className="users-tbl">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">User ID</TableCell>
                  <TableCell className="table-header">First Name</TableCell>
                  <TableCell className="table-header">Last Name</TableCell>
                  <TableCell className="table-header">Email</TableCell>
                  <TableCell className="table-header">Phone</TableCell>
                  <TableCell className="table-header">Actions</TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {displayedUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    {/* Delete Button */}
                    <TableCell>
                      <Button
                        className="delete-btn"
                        variant="contained"
                        onClick={() => handleDeleteClick(user._id)}
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
        {/* Pagination */}
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredUsers.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!selectedUser} onClose={handleCloseModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
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

export default AdminUsers;
