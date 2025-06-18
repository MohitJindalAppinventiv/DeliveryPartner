import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import * as api from '../api/authApi';
import type { DeliveryPartner } from '../api/authApi';

interface DeliveryPartnerState {
  partners: DeliveryPartner[];
  selectedPartner: DeliveryPartner | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DeliveryPartnerState = {
  partners: [],
  selectedPartner: null,
  status: 'idle',
  error: null,
};

// Async thunks
// export const fetchAllDeliveryPartners = createAsyncThunk<
//   DeliveryPartner[],
//   void,
//   { rejectValue: string }
// >('deliveryPartner/fetchAll', async (_, { rejectWithValue }) => {
//   try {
//     const data = await api.fetchDeliveryPartners();
//     return data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

export const fetchDeliveryPartner = createAsyncThunk<
  DeliveryPartner,
  void,
  { rejectValue: string }
>('deliveryPartner/fetchById', async (_, { rejectWithValue }) => {
  try {
    const data = await api.fetchDeliveryPartner(); // No ID passed
    console.log(data);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Slice
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
      // Fetch all delivery partners
      // .addCase(fetchAllDeliveryPartners.pending, (state) => {
      //   state.status = 'loading';
      //   state.error = null;
      // })
      // .addCase(fetchAllDeliveryPartners.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.partners = action.payload;
      // })
      // .addCase(fetchAllDeliveryPartners.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload ?? 'Failed to fetch delivery partners';
      // })
      // Fetch delivery partner by ID
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
export const selectDeliveryPartners = (state: RootState) => state.profile;
export const selectPartnersList = (state: RootState) => state.profile.partners;
export const selectSelectedPartner = (state: RootState) => state.profile.selectedPartner;
export const selectPartnersStatus = (state: RootState) => state.profile.status;
export const selectPartnersError = (state: RootState) => state.profile.error;

// Filtered selectors
export const selectActivePartners = (state: RootState) => 
  state.profile.partners.filter(partner => partner.isActive);

export const selectOnlinePartners = (state: RootState) => 
  state.profile.partners.filter(partner => partner.status === 'ONLINE');

export default deliveryPartnerSlice.reducer;