import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import { userSaga } from './sagas/userSaga';
import goalReducer from './slices/goalSlice';
import { goalSaga } from './sagas/goalSaga';
import { userAPISlice } from '../services/rtkQuery/userAPISlice';

const sagaInstance = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer,
    [userAPISlice.reducerPath]: userAPISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaInstance,userAPISlice.middleware)
});

sagaInstance.run(userSaga);
sagaInstance.run(goalSaga);