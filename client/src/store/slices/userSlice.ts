import {createSlice} from "@reduxjs/toolkit";
import {auth, login} from "../actions/userActions";

const initialState = {
    user: {
        login: "",
        id: ""
    },
    isAuth: false,
    error: "",
    isLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutCurrentUser(state) {
            state.user = {
                login: "",
                id: ""
            }
            state.isAuth = false

            localStorage.removeItem('token');
            console.log("LOGOUT", state)
        },

        setAuthError(state, action) {
            state.error = action.payload
            state.isLoading = false

        },

        userLoading(state, action) {
            state.isLoading = action.payload

        }
    },
    extraReducers: {
        [login.pending as any]: (state) => {
            state.isLoading = true
            state.error = ""
        },
        [login.fulfilled as any]: (state, action) => {
            console.log(action.payload)

            state.isLoading = false
            state.user = action.payload.user
            localStorage.setItem("token", action.payload.token)
            state.isAuth = true
        },
        [login.rejected as any]: (state, action) => {
            state.isLoading = true
            state.error = action.payload.message
        },

        [auth.pending as any]: (state, action) => {
            state.isLoading = true
            state.error = ""
        },
        [auth.fulfilled as any]: (state, action) => {
            console.log(action.payload)
            state.user = action.payload.user
            state.isAuth = true

            state.error = ""
            localStorage.setItem('token', action.payload.token)
            state.isLoading = false
        },
        [auth.rejected as any]: (state, action) => {
            state.isLoading = false
            state.error = action.payload.message
            localStorage.removeItem('token');

        }
    },
})

export const {logoutCurrentUser} = userSlice.actions

export default userSlice.reducer