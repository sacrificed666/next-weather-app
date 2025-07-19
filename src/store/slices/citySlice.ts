import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityState {
  value: string;
}

const initialState: CityState = {
  value: "Lviv",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;

export default citySlice.reducer;
