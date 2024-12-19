import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: "",
    error: "",
    user: {
        _id: "",
        name: "deepak.chaudhary@snva.com",
        email: "",
        picture: "",
        status: "",
        token: "",
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = ""; // Reset status to initial value or "idle"
            state.user = {
                _id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            };
            state.error = "";
        },
    }, // Reducers are functions that modify the state.
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
