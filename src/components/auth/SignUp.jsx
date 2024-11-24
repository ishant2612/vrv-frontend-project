import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(formData.email, formData.password, formData.fullName);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/login");
    } catch (err) {
      setError(
        err.message === "Insufficient permissions"
          ? "You do not have admin access"
          : "Failed to sign up with Google"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          mx: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Create Account
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ mb: 3 }}>
          Sign up to get started
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            name="fullName"
            label="Full Name"
            fullWidth
            margin="normal"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </form>

        <Box sx={{ my: 2 }}>
          <Divider>
            <Typography color="textSecondary" variant="body2">
              OR
            </Typography>
          </Divider>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={handleGoogleSignUp}
          disabled={loading}
          startIcon={<GoogleIcon />}
          sx={{
            borderColor: "#4285f4",
            color: "#4285f4",
            "&:hover": {
              borderColor: "#357abd",
              backgroundColor: "rgba(66, 133, 244, 0.04)",
            },
          }}
        >
          Sign up with Google
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <MuiLink component={Link} to="/login" underline="hover">
              Sign in here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
