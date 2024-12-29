import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  currentPage: string;
  isLoggedIn: boolean;
}

const initialState: NavbarState = {
  currentPage: "signup",  
  isLoggedIn: false,  
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setCurrentPage, login, logout } = navbarSlice.actions;
export default navbarSlice.reducer;