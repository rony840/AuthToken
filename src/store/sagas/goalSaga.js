import { call, put, takeLatest, select } from "redux-saga/effects";
import { deleteGoalSuccess, deleteGoalFailed,
    startLoading, stopLoading, setError,
    addGoalFailed, addGoalSuccess,
    editGoalFailed, editGoalSuccess,
    fetchGoalsSuccess, fetchGoalsFailed
} from "../slices/goalSlice";
import { addGoal,deleteGoal,editGoal,getGoals } from "../../services/GoalsAPI";
import { Alert } from "react-native";

const selectAuth = (state) => state.user;

function* addGoalSaga(action) {
    try {
            // Get authentication state
        const auth = yield select(selectAuth);

        // Check if user is authenticated
        if (!auth.isAuthenticated) {
            Alert.alert('Unauthorized', 'Please log in to add goals.');
            return;
        }
        yield put(startLoading());
        const response = yield call(addGoal, action.payload);
        yield put(addGoalSuccess(response));
    } catch (error) {
        console.error('Add goal error:', error);
        yield put(addGoalFailed());
        yield put(setError(error.message || 'error occurred while adding goal. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}

function* fetchGoalsSaga() {
  try {
      yield put(startLoading());
      const response = yield call(getGoals);
      yield put(fetchGoalsSuccess(response));
      
  } catch (error) {
      console.error('Fetch goal error:', error);
      yield put(fetchGoalsFailed());
      yield put(setError(error.message || 'error while fetching user Goals.'));
  } finally {
      yield put(stopLoading());
  }
}

function* editGoalSaga(action) {
    try {
        yield put(startLoading());
        const response = yield call(editGoal, action.payload.title, action.payload.id);
        yield put(editGoalSuccess(response));
    } catch (error) {
        console.error('Edit goal error:', error);
        yield put(editGoalFailed());
        yield put(setError(error.message || 'error occurred while editing goal. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}

function* deleteGoalSaga(action) {
    try {
        const response = yield call(deleteGoal,action.payload);
      yield put(deleteGoalSuccess(response));
    } catch (error) {
      console.error("Delete goal error:", error);
      yield put(deleteGoalFailed(error.message || "Error deleting goal."));
    }
  }

// Watcher saga
export function* goalSaga() {
  yield takeLatest('goal/addGoal', addGoalSaga);
  yield takeLatest('goal/editGoal', editGoalSaga);
  yield takeLatest('goal/fetchGoals', fetchGoalsSaga);
  yield takeLatest('goal/deleteGoal', deleteGoalSaga);
}
