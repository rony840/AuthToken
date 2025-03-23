import { call, put, takeLatest } from "redux-saga/effects";
import { logoutUserSuccess, logoutUserFailed,
    startLoading, stopLoading, setError,
    loginUserFailed, loginUserSuccess,
    signupUserFailed, signupUserSuccess,
    fetchUserSuccess, fetchUserFailed,
    loginWithTokenSuccess,
    loginWithTokenFailed
} from "../slices/userSlice";
import { login, signup, getUserInfo, logout, loginWithTokenAPI } from "../../services/UserAPI";
import { resetGoalStates } from "../slices/goalSlice";

function* loginUserSaga(action) {
    try {
        yield put(startLoading());
        const response = yield call(login, action.payload.email, action.payload.password);
        yield put(loginUserSuccess(response));
        
    } catch (error) {
        console.error('Login error:', error);
        yield put(loginUserFailed());
        yield put(setError(error.message || 'An error occurred during login. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}

function* loginWithTokenSaga(action) {
    try {
        yield put(startLoading());
        const response = yield call(loginWithTokenAPI, action.payload);
        yield put(loginWithTokenSuccess(response));
        
    } catch (error) {
        console.error('Login error:', error);
        yield put(loginWithTokenFailed());
        yield put(setError(error.message || 'An error occurred during login with token.'));
    } finally {
        yield put(stopLoading());
    }
}

function* fetchUserSaga() {
  try {
      yield put(startLoading());
      const response = yield call(getUserInfo);
      yield put(fetchUserSuccess(response));
      
  } catch (error) {
      console.error('Login error:', error);
      yield put(fetchUserFailed());
      yield put(setError(error.message || 'An error occurred while fetching user data.'));
  } finally {
      yield put(stopLoading());
  }
}

function* signupUserSaga(action) {
    try {
        yield put(startLoading());
        const response = yield call(signup, action.payload.name, action.payload.email, action.payload.password);
        yield put(signupUserSuccess(response));
        
    } catch (error) {
        console.error('Signup error:', error);
        yield put(signupUserFailed());
        yield put(setError(error.message || 'An error occurred during signup. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}

function* logoutUserSaga() {
    try {
      yield call(logout);
      yield put(resetGoalStates());
      yield put(logoutUserSuccess());
    } catch (error) {
      console.error("Logout error:", error);
      yield put(logoutUserFailed(error.message || "Logout failed. Try again."));
    }
  }

// Watcher saga
export function* userSaga() {
  yield takeLatest('user/loginUser', loginUserSaga);
  yield takeLatest('user/signupUser', signupUserSaga);
  yield takeLatest('user/fetchUser', fetchUserSaga);
  yield takeLatest('user/logoutUser', logoutUserSaga);
  yield takeLatest('user/loginWithToken', loginWithTokenSaga);
}
