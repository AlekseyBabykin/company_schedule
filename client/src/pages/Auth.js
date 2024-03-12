import React from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "../utils/const";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === SIGNIN_ROUTE;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isLogin ? "Sign in" : "Sign up"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              {isLogin ? (
                <Link href={SIGNUP_ROUTE} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              ) : (
                <Link href={SIGNIN_ROUTE} variant="body2">
                  Already have an account? Sign In
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
