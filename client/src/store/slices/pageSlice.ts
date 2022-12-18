import {createSlice} from "@reduxjs/toolkit";
import {createPageThunk, deletePageThunk, editPageThunk, getAllUserPagesThunk} from "../actions/pageActions";
import {PageType} from "../../config/types";

type State = {
    pages: PageType[],
    currentPage: PageType,
    isLoading: boolean
}


const initialState: State = {
    pages: [],
    currentPage: {
        _id: "",
        object: "page",
        user: "",
        title: "",
        content: [],
        status: false,
        focus: {
            focusRow: "title"
        }
    },
    isLoading: false
}

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        addPage(state, action) {
            state.pages.push(action.payload)
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        removeCurrentPage(state) {
            state.currentPage = state.pages[0] || initialState.currentPage
            localStorage.removeItem("page")
        },
        editPage(state, action) {
            const {id, values} = action.payload
            const index = state.pages.findIndex(page => page._id === id)
            state.pages[index] = {...state.pages[index], ...values}
            if (state.currentPage._id == action.payload.id) state.currentPage = state.pages[index]
        },
        removePage(state, action) {
            state.pages = state.pages.filter(page => page._id !== action.payload.id)
            if (state.currentPage._id == action.payload.id) state.currentPage = state.pages[0] || initialState.currentPage
        }
    },
    extraReducers: {
        [getAllUserPagesThunk.pending as any]: (state, action) => {
            state.isLoading = true
        },
        [getAllUserPagesThunk.fulfilled as any]: (state, action) => {
            state.pages = [...action.payload]
            state.isLoading = false
        },
        [getAllUserPagesThunk.rejected as any]: (state, action) => {
            console.log(action.payload)
            state.isLoading = false
        },

        [createPageThunk.pending as any]: (state, action) => {
            state.isLoading = true
        },
        [createPageThunk.fulfilled as any]: (state, action) => {
            state.pages.push(action.payload)
            state.isLoading = false
        },
        [createPageThunk.rejected as any]: (state, action) => {
            state.isLoading = false
        },

        [editPageThunk.pending as any]: (state, action) => {
            state.isLoading = true
        },
        [editPageThunk.fulfilled as any]: (state, action) => {
            const {page} = action.payload
            const index = state.pages.findIndex(page => page._id === page._id)
            state.pages[index] = page

            if (state.currentPage._id == action.payload.id) state.currentPage = page
            state.isLoading = false
        },
        [editPageThunk.rejected as any]: (state, action) => {
            state.isLoading = false
        },

        [deletePageThunk.pending as any]: (state, action) => {
            state.isLoading = true
        },
        [deletePageThunk.fulfilled as any]: (state, action) => {
            const index = state.pages.indexOf(action.payload._id)
            state.pages.splice(index, 1)
            state.isLoading = false
        },
        [deletePageThunk.rejected as any]: (state, action) => {
            state.isLoading = false
        },
    }
})

export const {addPage, setCurrentPage, removeCurrentPage, editPage, removePage} = pageSlice.actions

export default pageSlice.reducer