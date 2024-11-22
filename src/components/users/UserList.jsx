import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  Box,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { api } from "../../services/api";
import UserForm from "./UserForm";
import ConfirmDialog from "../common/ConfirmDialog";
import { Search } from "@mui/icons-material";
import debounce from "lodash/debounce";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    userId: null,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roles.some((role) =>
          role.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredUsers(filtered);
    setPage(0); // Reset to first page when search changes
  }, [users, searchQuery]);

  const displayedUsers = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 300),
    []
  );

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    setDeleteConfirm({ open: true, userId: id });
  };

  const confirmDelete = async () => {
    try {
      await api.deleteUser(deleteConfirm.userId);
      loadUsers();
    } catch (err) {
      setError("Failed to delete user");
    } finally {
      setDeleteConfirm({ open: false, userId: null });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (userData) => {
    if (selectedUser) {
      await api.updateUser(selectedUser.id, userData);
    } else {
      await api.createUser(userData);
    }
    loadUsers();
    handleFormClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => setIsFormOpen(true)}>
          Add User
        </Button>
        <TextField
          placeholder="Search users..."
          variant="outlined"
          size="small"
          onChange={(e) => debouncedSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mt: 2, overflow: "auto" }}>
        <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Email
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Status
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Roles
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {user.email}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {user.status}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {user.roles.join(", ")}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleEdit(user)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button size="small" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}

      <ConfirmDialog
        open={deleteConfirm.open}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onClose={() => setDeleteConfirm({ open: false, userId: null })}
      />
    </div>
  );
};

export default React.memo(UserList);
