import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '../../apis/Category';
export const getCategories = createAsyncThunk('app/category', async (data, { rejectWithValue }) => {
    const response = await categoryApi.getAllCategory();
    if (!response.success) return rejectWithValue(response);
    return response.data;
});
