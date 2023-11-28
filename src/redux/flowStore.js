import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./flowAction";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getDefaultMiddleware } from '@reduxjs/toolkit';


const persistConfig = {
    key: 'root',
    storage,
  }
 const persistedReducer = persistReducer(persistConfig, flowReducer);

export const flowStore = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})

export const persistor = persistStore(flowStore)