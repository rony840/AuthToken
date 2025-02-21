import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import { userSaga } from './sagas/userSaga';
import goalReducer from './slices/goalSlice';
import { goalSaga } from './sagas/goalSaga';
const sagaInstance = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaInstance)
});

sagaInstance.run(userSaga);
sagaInstance.run(goalSaga);