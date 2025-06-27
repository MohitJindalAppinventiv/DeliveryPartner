import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..//store';
import * as api from '../../api/authApi';
import type { DeliveryPartner } from '../../api/authApi';

interface DeliveryPartnerState {
  selectedPartner: DeliveryPartner | null;
  status:  "idle" | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DeliveryPartnerState = {
  selectedPartner: null,
  status: 'idle',
  error: null,
};

export const fetchDeliveryPartner = createAsyncThunk<
  DeliveryPartner,
  void,
  { rejectValue: string }
>('deliveryPartner/fetchById', async (_, { rejectWithValue }) => {
  try {
    const data = await api.fetchDeliveryPartner();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const deliveryPartnerSlice = createSlice({
  name: 'deliveryPartner',
  initialState,
  reducers: {
    clearSelectedPartner: (state) => {
      state.selectedPartner = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryPartner.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDeliveryPartner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPartner = action.payload;
      })
      .addCase(fetchDeliveryPartner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch delivery partner';
      });
  },
});

export const { clearSelectedPartner, clearError } = deliveryPartnerSlice.actions;

// Selectors
export const selectDeliveryPartnerProfile = (state: RootState) => state.profile;
export const selectSelectedPartner = (state: RootState) => state.profile.selectedPartner;
export const selectPartnersStatus = (state: RootState) => state.profile.status;
export const selectPartnersError = (state: RootState) => state.profile.error;

export default deliveryPartnerSlice.reducer;
