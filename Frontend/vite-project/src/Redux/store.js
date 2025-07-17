import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // ✅ no curly braces here
import { UserReducer } from './reducers/UserReducer.js';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

// const middleware = [thunk];
const rootReducer  = combineReducers({
   user: UserReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer )

export const store = configureStore({
  reducer: persistedReducer
//   middleware: middleware

});

export const persistor = persistStore(store);
