import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  user: 'qu'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
  }
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;