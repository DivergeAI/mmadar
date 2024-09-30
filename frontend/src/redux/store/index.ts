import { configureStore } from "@reduxjs/toolkit";
import configReducer from "../slices/config/slice";
import authReducer from "../slices/auth/slice";
import documentsReducer from "../slices/documents/slice";

export const store = configureStore({
    reducer :{
        config : configReducer,
        auth : authReducer,
        documents : documentsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch