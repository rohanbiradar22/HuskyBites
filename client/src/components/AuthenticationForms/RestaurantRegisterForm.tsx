import React from "react";
import { paperStyle, headerStyle, checkBoxStyle, buttonStyle } from "./formStyles";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import classes from "../../styles/styles.module.css";
import Link from "next/link";
import { RestaurantRegisterFormProps } from "@/models/auth";

const RestaurantRegiserForm: React.FC<RestaurantRegisterFormProps> = ({
  formHandler,
  restaurantName,
  setRestaurantName,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  addressLine,
  setAddressLine,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  country,
  setCountry,
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  showPassword,
  handleClickShowPassword,
  params
}) => {
  return (
    <>
      <Grid className={classes.gridContainer}>
        <Paper elevation={20} style={paperStyle}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "rgba(3,193,103,255)" }}></Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption">Please register to create restaurant account</Typography>
          </Grid>
          <form onSubmit={formHandler}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
              }}
            >
              <TextField
                type="text"
                label="Restaurant Name"
                variant="outlined"
                sx={{ marginTop: "25px" }}
                onChange={(e) => setRestaurantName(e.target.value)}
                value={restaurantName}
              ></TextField>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Owner  First Name"
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                ></TextField>
                <TextField
                  fullWidth
                  label="Owner Last Name"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                ></TextField>
              </Box>
              <TextField
                label="Address line"
                type="text"
                variant="outlined"
                onChange={(e) => setAddressLine(e.target.value)}
                value={addressLine}
              ></TextField>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                }}
              >
                <TextField
                  type="text"
                  label="City"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                ></TextField>
                <TextField
                  type="text"
                  label="State"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                ></TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                }}
              >
                <TextField
                  type="text"
                  label="Zip Code"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setZipCode(e.target.value)}
                  value={zipCode}
                ></TextField>
                <TextField
                  type="text"
                  label="Country"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                ></TextField>
              </Box>
              <TextField
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                error={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
              <FormControl sx={{ width: "100%" }} variant="outlined" error={false}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></TextField>
            </Box>
            <FormControlLabel
              required
              control={<Checkbox />}
              label={
                <Typography variant="caption" style={checkBoxStyle}>
                  I accept all terms & conditions
                </Typography>
              }
              className="text-sm"
            />
            <Button fullWidth type="submit" variant="contained" sx={{ marginTop: "10px" }} style={buttonStyle}>
              Sign Up
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
              <Typography sx={{ fontSize: "14px" }}>
                Already have an account? {"  "}
                <Link href="/login" className="no-underline text-blue-600">
                  Login Now
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default RestaurantRegiserForm;
