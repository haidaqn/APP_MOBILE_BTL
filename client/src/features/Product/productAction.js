import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../apis/product';

export const getProductSmart = createAsyncThunk('app/product', async (data, { rejectWithValue }) => {
  const response = await productApi.getProductSmart();
  if (!response?.status) rejectWithValue(response);
  return response.products;
});

export const getProductTablet = createAsyncThunk('app/product', async (data, { rejectWithValue }) => {
  const response = await productApi.getProductTablet();
  if (!response.status) rejectWithValue(response);
  return response.products;
});

export const getProductLaptop = createAsyncThunk('app/product', async (data, { rejectWithValue }) => {
  const response = await productApi.getProductLaptop();
  if (!response.status) rejectWithValue(response);
  return response.products;
});

export const getProductAccessories = createAsyncThunk('app/product', async (data, { rejectWithValue }) => {
  const response = await productApi.getProductAccessories();
  if (!response.status) rejectWithValue(response);
  return response.products;
});
