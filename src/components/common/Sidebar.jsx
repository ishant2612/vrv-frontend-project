import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { People, VpnKey, Dashboard } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ mobileOpen, onClose, isMobile }) => {
  const location = useLocation();
  const { userRoles } = useAuth();
  const isAdmin = userRoles.includes("admin");
  const isManager = userRoles.includes("manager");
  const isUser = userRoles.includes("user");

  const getBasePath = () => {
    if (isAdmin) return "/admin";
    if (isManager) return "/manager";
    return "/user";
  };

  const drawerContent = (
    <>
      <List>
        <ListItem
          button
          component={Link}
          to={getBasePath()}
          onClick={isMobile ? onClose : undefined}
          selected={location.pathname === getBasePath()}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Only show Users and Roles for admin */}
        {isAdmin && (
          <>
            <ListItem
              button
              component={Link}
              to="/admin/users"
              onClick={isMobile ? onClose : undefined}
              selected={location.pathname === "/admin/users"}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admin/roles"
              onClick={isMobile ? onClose : undefined}
              selected={location.pathname === "/admin/roles"}
            >
              <ListItemIcon>
                <VpnKey />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            top: "64px",
            height: "calc(100% - 64px)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
