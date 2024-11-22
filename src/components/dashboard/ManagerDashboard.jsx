import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  SupervisorAccount,
  Assessment,
  Group,
  CheckCircle,
  Schedule,
} from "@mui/icons-material";

const ManagerDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
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
            <Group sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Team Members</Typography>
            <Typography variant="h4">12</Typography>
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
            <Assessment sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Projects</Typography>
            <Typography variant="h4">5</Typography>
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
            <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Completed Tasks</Typography>
            <Typography variant="h4">25</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Performance
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Alpha"
                    secondary="On track - 75% completed"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Beta"
                    secondary="Delayed - 45% completed"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Gamma"
                    secondary="Ahead of schedule - 90% completed"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Updates
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Team Meeting"
                    secondary="Scheduled for tomorrow at 10:00 AM"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Performance Review"
                    secondary="Due by end of week"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="New Project Assignment"
                    secondary="Project Delta starting next week"
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

export default ManagerDashboard;
