import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goal: {id: "", title: ""},
    goals: [],
    loading: false,  
    error: null,
};

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        addGoal: (state, action) => {
            state.goal = action.payload;
        },
        addGoalFailed: (state, action) => {
            state.error = action.payload;
        },
        addGoalSuccess: (state, action) => {
            state.goals.push(action.payload);
        },
        editGoal: (state, action) => {
            state.goal = action.payload;
        },
        editGoalFailed: (state, action) => {
            state.error = action.payload;
        },
        editGoalSuccess: (state, action) => {
            state.goals = action.payload;
        },
        deleteGoal: (state, action) => {
            state.goal = action.payload;
        },
        deleteGoalFailed: (state, action) => {
            state.error = action.payload;
        },
        deleteGoalSuccess: (state, action) => {
            state.goals = action.payload;
        },
        fetchGoals: (state, action) => {
            state.goal = action.payload;
        },
        fetchGoalsFailed: (state, action) => {
            state.error = action.payload;
        },
        fetchGoalsSuccess: (state, action) => {
            state.goals = action.payload;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { 
    addGoal,
    addGoalSuccess,
    addGoalFailed,
    editGoal,
    editGoalFailed,
    editGoalSuccess,
    deleteGoal,
    deleteGoalFailed,
    deleteGoalSuccess,
    fetchGoals,
    fetchGoalsFailed,
    fetchGoalsSuccess,
    startLoading, 
    stopLoading, 
    setError 
} = goalSlice.actions;

export default goalSlice.reducer;
