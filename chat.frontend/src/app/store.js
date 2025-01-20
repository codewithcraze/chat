import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import chatReducer from './features/chatSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";

// Adjust the filter path based on your state structure
const saveUserOnlyFilter = createFilter("user", ["user"]);

const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"], // only user will be persisted
    transforms: [saveUserOnlyFilter],
};
    
const rootReducer = combineReducers({
    user: userReducer, // Use userSlice.reducer or import as userReducer
    chat: chatReducer, // Use chatReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true, // Optional: enabled by default in development
});

export const persistor = persistStore(store);
