import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;

const initialState = {
    status: "", // Default value
    error: null, // Default value, it's better to initialize error as null
    user: {
        _id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
    },
};

// Async Thunks.
export const registerUser = createAsyncThunk(
    'user/register', // action type
    async (values, { rejectWithValue }) => {
        try {
            const body = {
                name: values.name,
                email: values.email,
                password: values.password,
                status: values.status
            };
            const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, body);
            if (data.status) {
                return data.user;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.error?.message || 'Something went wrong';
            return rejectWithValue(errorMessage);
        }
    }
);

// Login Thunks
export const loginUser = createAsyncThunk(
    'user/login',
    async (values, { rejectWithValue }) => {
        try {
            const body = {
                email: values.email,
                password: values.password,
            };
            const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, body);
            if (data.status) {
                return data.user;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.error?.message || 'Something went wrong';
            return rejectWithValue(errorMessage);
        }
    }
)

// Creating Slice.
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.user = { ...initialState.user };
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = { ...action.payload };
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.user = { ...initialState.user };
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = { ...action.payload };
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.user = { ...initialState.user };
            });
    }
});

// Export actions
export const { logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
