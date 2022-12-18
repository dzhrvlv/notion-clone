// userAction.js
import {AnyAction, AsyncThunk, createAsyncThunk} from "@reduxjs/toolkit";
import {UserDataLoginType} from "../../config/types";
import {AuthorizationHeaderConfig, url} from "../../config/config";
import axios from "axios";

export const signup = createAsyncThunk(
    'user/signup',
    async ({login, password}: UserDataLoginType, {rejectWithValue}) => {
        try {
            await axios.post(`${url}/api/auth/register`, {login, password})
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const login = createAsyncThunk(
    'user/signup',
    async ({login, password}: UserDataLoginType, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${url}/api/auth/login`, {login, password})
            return response.data

        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const auth = createAsyncThunk(
    'user/auth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${url}/api/auth/auth`, AuthorizationHeaderConfig)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)
