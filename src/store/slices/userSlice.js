import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {email: "", name:""},
    currentUser: {name: ""},
    authUser: "",
    isAuthenticated: false,
    signedup: false,
    loggedin: false,
    loading: false,  // Add a loading state to handle async operations
    error: null,     // Optional: Add an error state for error handling
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signupUser: (state, action) => {
            state.user = action.payload;
        },
        signupUserFailed: (state, action) => {
            state.authUser = action.payload;
            state.signedup = false;
        },
        signupUserSuccess: (state, action) => {
            state.authUser = action.payload;
            state.signedup = true;
        },
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        loginUserFailed: (state, action) => {
            state.authUser = action.payload;
            state.loggedin = false;
        },
        loginUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loggedin = true;
            state.isAuthenticated= true;
        },
        fetchUser: (state, action) => {
            state.user = action.payload;
        },
        fetchUserFailed: (state, action) => {
            state.authUser = action.payload;
        },
        fetchUserSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.loading = true;
        },
        logoutUserSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.signedup = false;
            state.loggedin = false;
            state.authUser = "Logged Out!";
            state.currentUser = {username: ""}
            state.loading = false;
        },
        logoutUserFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        startLoading: (state) => {
            state.loading = true; // Set loading to true when starting async operations
        },
        stopLoading: (state) => {
            state.loading = false; // Set loading to false when done
        },
        setError: (state, action) => {
            state.error = action.payload; // Store error messages
        },
    }
});

export const { 
    signupUser,
    signupUserFailed,
    signupUserSuccess,
    loginUser,
    loginUserFailed,
    loginUserSuccess,
    fetchUser,
    fetchUserSuccess,
    fetchUserFailed,
    logoutUser,
    logoutUserSuccess,
    logoutUserFailed,
    startLoading, 
    stopLoading, 
    setError 
} = userSlice.actions;

export default userSlice.reducer;
