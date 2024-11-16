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
import { LoginFormProps } from "@/models/auth";
import { dictionary } from '../../../translation';

const LoginForm: React.FC<LoginFormProps> = ({
  formHandler,
  email,
  setEmail,
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
            <h2 style={headerStyle}>{dictionary[params.lang]?.login_form_header || "Sign In"}</h2>
          </Grid>
          <form onSubmit={formHandler}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "16px",
              }}
            >
              <TextField
                fullWidth
                type="email"
                label={dictionary[params.lang]?.email || "Email"}
                variant="outlined"
                sx={{ marginTop: "25px" }}
                error={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
              <FormControl sx={{ width: "100%" }} variant="outlined" error={false}>
                <InputLabel htmlFor="outlined-adornment-password">{dictionary[params.lang]?.password || "Password"}</InputLabel>
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
            </Box>

            <Typography
              sx={{
                textAlign: "right",
                color: "#2196F3",
                fontSize: "13px",
                mt: "5px",
              }}
            >
              <Link href="forgot-password" className="text-decoration-none">
                {" "}
                {dictionary[params.lang]?.forgot_password_text || "Forgot Password?"}
              </Link>
            </Typography>

            <Button fullWidth type="submit" variant="contained" sx={{ marginTop: "15px" }} style={buttonStyle}>
            {dictionary[params.lang]?.login_form_header || "Sign In"}
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
              <Typography sx={{ fontSize: "14px" }}>
                {" "}
                {dictionary[params.lang]?.not_registered_text || "Not registered?"}
                <Link href="/register" className="no-underline text-blue-600">
                  {" "}
                  {dictionary[params.lang]?.sign_up_here || "SignUp Here"}
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default LoginForm;
