import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
    uid: string;
    email: string;
    displayName: string;
}

interface AuthState {
  currentUser: AuthUser | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: true,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthUser| null>) => {
            state.currentUser = action.payload;
            state.isLoading = false;
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;