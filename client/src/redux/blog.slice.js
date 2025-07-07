import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: initialState,
  reducers: {
    setBlog: (state, action) => {
      const payload = action.payload;
      state.blog = payload;
    },
    removeBlog: (state) => {
      state.blog = {};
    },
  },
});

export const { setBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
