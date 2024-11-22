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
import { Search as SearchIcon } from "@mui/icons-material";
import { api } from "../../services/api";
import RoleForm from "./RoleForm";
import ConfirmDialog from "../common/ConfirmDialog";
import debounce from "lodash/debounce";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    roleId: null,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    const filtered = roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.permissions.some((permission) =>
          permission.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredRoles(filtered);
    setPage(0); // Reset to first page when search changes
  }, [roles, searchQuery]);

  const displayedRoles = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredRoles.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRoles, page, rowsPerPage]);

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 300),
    []
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const loadRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getRoles();
      setRoles(data);
    } catch (err) {
      setError("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ open: true, roleId: id });
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedRole(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedRole) {
        await api.updateRole(selectedRole.id, formData);
      } else {
        await api.createRole(formData);
      }
      loadRoles();
      handleFormClose();
    } catch (err) {
      setError("Failed to save role");
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => setIsFormOpen(true)}>
          Add Role
        </Button>
        <TextField
          placeholder="Search roles..."
          variant="outlined"
          size="small"
          onChange={(e) => debouncedSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
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
              <TableCell>Name</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Description
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Permissions
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {role.description}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {role.permissions.join(", ")}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleEdit(role)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button size="small" onClick={() => handleDelete(role.id)}>
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
          count={filteredRoles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {isFormOpen && (
        <RoleForm
          role={selectedRole}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}

      <ConfirmDialog
        open={deleteConfirm.open}
        title="Delete Role"
        message="Are you sure you want to delete this role?"
        onConfirm={async () => {
          try {
            await api.deleteRole(deleteConfirm.roleId);
            loadRoles();
          } catch (err) {
            setError("Failed to delete role");
          } finally {
            setDeleteConfirm({ open: false, roleId: null });
          }
        }}
        onClose={() => setDeleteConfirm({ open: false, roleId: null })}
      />
    </div>
  );
};

export default RoleList;
