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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const { roles } = await login(email, password);

      // Redirect based on role
      if (roles.includes("admin")) {
        navigate("/admin");
      } else if (roles.includes("manager")) {
        navigate("/manager");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      const { roles } = await loginWithGoogle();

      // Redirect based on role
      if (roles.includes("admin")) {
        navigate("/admin");
      } else if (roles.includes("manager")) {
        navigate("/manager");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message || "Failed to sign in with Google");
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
          Welcome Back
        </Typography>
        <Typography color="textSecondary" align="center" sx={{ mb: 3 }}>
          Sign in to access your admin panel
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} /> : "Sign In"}
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
          onClick={handleGoogleSignIn}
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
          Sign in with Google
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{" "}
            <MuiLink component={Link} to="/signup" underline="hover">
              Sign up here
            </MuiLink>
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            <MuiLink component={Link} to="/forgot-password" underline="hover">
              Forgot Password?
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
