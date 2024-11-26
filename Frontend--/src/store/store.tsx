import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  isAuthenticated: false,
};

// Create a slice of the state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Export the actions generated from the slice
export const { login, logout } = authSlice.actions;

// Configure and create the store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,  // Combine the auth slice with other reducers if necessary
  },
});

export default store;
