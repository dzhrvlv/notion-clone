import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import {useDispatch} from "react-redux";
import pageSlice from "./slices/pageSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        pages: pageSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()