import { createSlice } from "@reduxjs/toolkit";
import { Document } from "../../../types/documents";
import { apiReducerBuilder } from "../../../utils/apiReducerBuilders";
import { createDocument, deleteDocument, fetchAllDocuments, updateDocument } from "./thunk";

type initialStateType ={
    documents: Document[];
    loading: boolean;
    error: any;
}
const initialState:initialStateType = {
    documents: [],
    loading: false,
    error: null,
    };

    const slice = createSlice({
        name: 'documents',
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            apiReducerBuilder(builder,fetchAllDocuments , (state:any, action:any) => {
                state.documents = action.payload
            })
            apiReducerBuilder(builder, createDocument, (state:any, action:any) => {
                state.documents.push(action.payload)
            })
            apiReducerBuilder(builder, deleteDocument, (state:any, action:any) => {
                state.documents = state.documents.filter((doc:Document) => doc.name !== action.payload)
            })
            apiReducerBuilder(builder, updateDocument, (state:any, action:any) => {
                const updatedDocument = action.payload;
                const index = state.documents.findIndex((doc: Document) => doc.name === updatedDocument.name);
                if (index !== -1) {
                    state.documents[index] = updatedDocument;
                }
                
            })
        }
    })

    export default slice.reducer
