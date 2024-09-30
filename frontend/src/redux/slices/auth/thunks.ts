import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";

export const  fetchUser = createAsyncThunk ('auth/getBackendConfig', async () => {
 const response = await AuthService.fetchUser();
 return response;
})
