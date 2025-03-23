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
            console.log('in edit slice success:',action.payload)
            const index = state.goals.findIndex(goal => goal._id === action.payload._id);
            if (index !== -1) {
                console.log('after editing goal state:',state.goals[index])
                state.goals[index].title = action.payload.title;
                state.goals[index].updatedAt = action.payload.updatedAt;
            }
            console.log('after editing goal state:',state.goals[index])
        },
        deleteGoal: (state, action) => {
            state.goal = action.payload;
        },
        deleteGoalFailed: (state, action) => {
            state.error = action.payload;
        },
        deleteGoalSuccess: (state, action) => {
            console.log('in delete slice success:',action.payload)
            state.goals = state.goals.filter(goal => goal._id !== action.payload._id);
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
        resetGoalStates: (state) => {
            state.goal = {id: "", title: ""};
            state.goals = [];
            state.loading = false;
            state.error = null;
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
    resetGoalStates,
    startLoading, 
    stopLoading, 
    setError 
} = goalSlice.actions;

export default goalSlice.reducer;
