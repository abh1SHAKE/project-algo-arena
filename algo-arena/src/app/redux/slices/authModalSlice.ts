import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthModalState = {
    isOpen: boolean;
    type: "login" | "signup" | "forgotPassword";
}

const initialAuthModalState: AuthModalState = {
    isOpen: false,
    type: "login"
}

const authModalSlice = createSlice({
    name: "AuthModal",
    initialState: initialAuthModalState,
    reducers: {
        openModal: (state, action: PayloadAction<"login" | "signup" | "forgotPassword">) => {
            state.isOpen = true;
            state.type = action.payload;
        },

        closeModal: (state) => {
            state.isOpen = false;
            state.type = "login";
        },

        setModalState: (state, action: PayloadAction<AuthModalState>) => {
            return action.payload;
        }
    }
});

export const { openModal, closeModal, setModalState } = authModalSlice.actions;
export default authModalSlice.reducer;