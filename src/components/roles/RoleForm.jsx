import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { api } from "../../services/api";

const RoleForm = ({ role, onClose }) => {
  const [permissions, setPermissions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadPermissions();
    if (role) {
      setFormData(role);
    }
  }, [role]);

  const loadPermissions = async () => {
    const data = await api.getPermissions();
    setPermissions(data);
  };

  const handlePermissionChange = (permission) => {
    const newPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((p) => p !== permission)
      : [...formData.permissions, permission];

    setFormData({
      ...formData,
      permissions: newPermissions,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Role name is required";
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = "At least one permission must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        if (role) {
          await api.updateRole(role.id, formData);
        } else {
          await api.createRole(formData);
        }
        onClose();
      } catch (err) {
        setErrors({ submit: "Failed to save role" });
      }
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          margin: { xs: 2, sm: "auto" },
        },
      }}
    >
      <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Role Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <FormControl component="fieldset" margin="normal">
          <FormGroup>
            {permissions.map((permission) => (
              <FormControlLabel
                key={permission.id}
                control={
                  <Checkbox
                    checked={formData.permissions.includes(permission.name)}
                    onChange={() => handlePermissionChange(permission.name)}
                  />
                }
                label={permission.description}
              />
            ))}
          </FormGroup>
        </FormControl>
        {errors.permissions && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.permissions}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {role ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleForm;
