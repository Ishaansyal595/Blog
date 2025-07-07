import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: {},
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      const payload = action.payload;
      state.category = payload;
    },
    removeCategory: (state, action) => {
      state.category = {};
    },
  },
});

export const { setCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;
