//*THIS FILE CAONTAINS THE STORE CONFIGURATION

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
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
import storage from "redux-persist/lib/storage";

//store will be saved in localstorage with name "root"
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//if we have multiple reducers we combine it make single root reducer
const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
