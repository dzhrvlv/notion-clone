import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AuthorizationHeaderConfig, url} from "../../config/config";

export const getAllUserPagesThunk = createAsyncThunk(
    'page/getAll',
    async (_, {rejectWithValue}) => {
        try {
            console.log(AuthorizationHeaderConfig)
            const response = await axios.get(`${url}/api/blocks/pages/getAll`, AuthorizationHeaderConfig)
            return response.data
        }
        catch (e: any) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const createPageThunk = createAsyncThunk(
    'page/create',
    async (_, {rejectWithValue}) => {
        try {
            console.log(AuthorizationHeaderConfig)

            const response = await axios.post(`${url}/api/blocks/pages/create`, null, AuthorizationHeaderConfig)
            console.log(response)
            return response.data
        }
        catch (e: any) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const editPageThunk = createAsyncThunk(
    'page/edit',
    async ({id, values}: {id: string, values: any}, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${url}/api/blocks/pages/${id}`, values, AuthorizationHeaderConfig)
            return response.data
        }
        catch (e: any) {
            return rejectWithValue(e.response.data.message)
        }
    }
)

export const deletePageThunk = createAsyncThunk(
    'page/delete',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${url}/api/blocks/pages/${id}`, AuthorizationHeaderConfig)
            return response.data
        }
        catch (e: any) {
            return rejectWithValue(e.response.data.message)
        }
    }
)