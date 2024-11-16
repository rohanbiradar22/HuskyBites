import Restaurant from "@/models/restaurant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRestaurants } from "../actions/restaurant-actions";

interface RestaurantsState {
  restaurants: Restaurant[];
  loading: boolean;
  error: null | string;
}

const initialState: RestaurantsState = {
  loading: true,
  restaurants: [],
  error: null,
};

// restaurant slice for restaurant store
const restaurantsSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRestaurants.fulfilled,
        (state, action: PayloadAction<Restaurant[]>) => {
          state.loading = false;
          state.restaurants = action.payload;
        }
      )
      .addCase(getRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching restaurants";
      });
  },
});

export default restaurantsSlice.reducer;
