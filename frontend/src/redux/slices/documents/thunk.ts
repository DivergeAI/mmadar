import { createAsyncThunk } from "@reduxjs/toolkit";
import DocService from "../../../services/DocService";

export const fetchAllDocuments = createAsyncThunk('documents/fetchAllDocuments', async () => {
    const response = await DocService.fetchAllDocuments();
    return response;
});

export const createDocument = createAsyncThunk('documents/createDocument', async (data: any) => {
    const response = await DocService.createDocument(data);
    return response;
})

export  const deleteDocument = createAsyncThunk('documents/deleteDocument', async (name: string) => {
     await DocService.deleteDocument(name);
    return name;
})

export const updateDocument = createAsyncThunk('documents/updateDocument', async (data: any) => {
    const response = await DocService.updateDocument(data);
    return response;
})