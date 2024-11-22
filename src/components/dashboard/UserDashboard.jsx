import React from "react";
import { Box, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import { Person, Assignment, Notifications } from "@mui/icons-material";

const UserDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "primary.light",
              color: "white",
            }}
          >
            <Person sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">My Profile</Typography>
            <Typography variant="body2">View and edit your profile</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "secondary.light",
              color: "white",
            }}
          >
            <Assignment sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">My Tasks</Typography>
            <Typography variant="body2">View your assigned tasks</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "success.light",
              color: "white",
            }}
          >
            <Notifications sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Notifications</Typography>
            <Typography variant="body2">View your notifications</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography color="textSecondary">
                • Logged in today at 9:00 AM
              </Typography>
              <Typography color="textSecondary">
                • Updated profile picture yesterday
              </Typography>
              <Typography color="textSecondary">
                • Completed task "Review Documents" 2 days ago
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
