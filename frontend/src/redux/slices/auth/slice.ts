import { createSlice } from "@reduxjs/toolkit";
import { apiReducerBuilder } from "../../../utils/apiReducerBuilders";
import { fetchUser } from "./thunks";

const initialState ={
    user: null,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        apiReducerBuilder(builder, fetchUser, (state:any, action:any) => {
            state.user = action.payload
        })
    }
})

export default slice.reducer