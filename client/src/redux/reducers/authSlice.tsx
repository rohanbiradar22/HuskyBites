import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateOtpAction, loginAction, registerAction, updatePasswordAction } from "../actions/auth-actions";
import { loginErrorResponse, loginSuccessResponse } from "@/models/auth";
import { User } from "@/models/auth";

const token = typeof window !== "undefined" ? localStorage.getItem("token")  : null;

interface AuthState {
  loading: boolean;
  user: User | null;
  token: null | string;
  error: null | string;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  token,
  error: null,
};

// auth slice for updating auth state
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = null;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(generateOtpAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(generateOtpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = null;
    });
    builder.addCase(generateOtpAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = null;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
