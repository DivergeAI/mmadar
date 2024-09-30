import { createSlice } from "@reduxjs/toolkit";
import { apiReducerBuilder } from "../../../utils/apiReducerBuilders";
import { fetchBackendConfig } from "./thunks";

const initialState = {
    config: {},
    error: null,
    isLoading: false
}
const slice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        apiReducerBuilder(builder, fetchBackendConfig, (state:any, action:any) => {
            state.config = action.payload
        })
    }

}
)

export default slice.reducer