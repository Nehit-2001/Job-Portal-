import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./authSlice";
import { jobSliceReducer } from "./jobSlice.js";
// import storage from "redux-persist/lib/storage"; 

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { companyReducer, companySlice } from "./companySlice.js";
import { applicationSliceReducer } from "./applicationSlice.js";

const storage = {
    setItem(key, value) {
        localStorage.setItem(key, value);
        return Promise.resolve(true);
    },
    getItem(key) {
        const value = localStorage.getItem(key);
        return Promise.resolve(value);
    },
    removeItem(key) {
        localStorage.removeItem(key);
        return Promise.resolve();
    },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage, 
};

const rootReducer = combineReducers({
    auth: authSliceReducer,
    job: jobSliceReducer,
    company: companyReducer,
    application: applicationSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); 
export default store;