import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;

const initialState = {
    status: "loading", // Default value
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
            }
            const { data } =await axios.post(AUTH_ENDPOINT + '/register', body)
            return data;
      } catch (error) {
        // If an error occurs, return the error message using rejectWithValue
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "loading"; //Reset status to "idle" or "loading"
            state.user = {
                _id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            };
            state.error = null; // Reset error to null
        },
        // Add other actions as needed (e.g., setStatus, setError)
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.status = "successed";
            state.user = action.payload;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.user = initialState.user;
        })
    }
});

// Export actions
export const { logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
