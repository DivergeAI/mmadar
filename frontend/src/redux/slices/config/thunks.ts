import { createAsyncThunk } from "@reduxjs/toolkit";
import ConfigService from "../../../services/ConfigService";

export const  fetchBackendConfig = createAsyncThunk ('config/getBackendConfig', async () => {
 const response = await ConfigService.fetchBackendConfig();
 return response;
})
