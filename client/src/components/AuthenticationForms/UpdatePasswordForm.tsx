import React from "react";
import { paperStyle, headerStyle, buttonStyle } from "./formStyles";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
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
import { UpdatePasswordFormProps } from "@/models/auth";

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  formHandler,
  email,
  setEmail,
  otp,
  setOtp,
  password,
  setPassword,
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
            <h2 style={headerStyle}>New Password</h2>
            <Typography variant="caption">Please verify your otp</Typography>
          </Grid>
          <form onSubmit={formHandler}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "25px",
                rowGap: "15px",
              }}
            >
              <TextField
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></TextField>
              <TextField
                fullWidth
                type="text"
                label="Otp"
                variant="outlined"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              ></TextField>
              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
                error={false}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px" }}
              style={buttonStyle}
            >
              Update Password
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
              <Typography sx={{ fontSize: "14px" }}>
                <Link href="/login" className="no-underline text-gray-500">
                  {`<< Back to Login`}
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default UpdatePasswordForm;
