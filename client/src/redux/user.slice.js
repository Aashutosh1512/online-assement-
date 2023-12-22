import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state) => {
  return state.user.user;
};

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
