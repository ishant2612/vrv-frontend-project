import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  People,
  VpnKey,
  Assessment,
  Security,
  Notifications,
  Timeline,
} from "@mui/icons-material";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "150",
      icon: <People sx={{ fontSize: 40 }} />,
      color: "primary.light",
    },
    {
      title: "Active Roles",
      value: "8",
      icon: <VpnKey sx={{ fontSize: 40 }} />,
      color: "secondary.light",
    },
    {
      title: "System Health",
      value: "98%",
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: "success.light",
    },
  ];

  const recentActivities = [
    {
      action: "New user registered",
      time: "5 minutes ago",
      icon: <People color="primary" />,
    },
    {
      action: "Role permissions updated",
      time: "30 minutes ago",
      icon: <Security color="secondary" />,
    },
    {
      action: "System backup completed",
      time: "1 hour ago",
      icon: <Assessment color="success" />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: stat.color,
                color: "white",
              }}
            >
              {stat.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {stat.title}
              </Typography>
              <Typography variant="h4">{stat.value}</Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{activity.icon}</ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Overview
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Timeline color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="System Performance"
                    secondary="Optimal - 95% efficiency"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Notifications color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Active Alerts"
                    secondary="No critical alerts"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Security Status"
                    secondary="All systems secure"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
