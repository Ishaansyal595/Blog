import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/user.slice.js";
import categoryReducer from './redux/category.slice.js'
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const presistedUser = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedUser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
