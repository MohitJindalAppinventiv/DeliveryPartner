
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import * as api from '../../api/authApi';

interface ForgotPasswordState {
  step: 'email' | 'otp' | 'reset';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  email?: string;
  authToken?: string;   
  accessToken?: string;
  error?: string | null;
}

const initialState: ForgotPasswordState = {
  step: 'email',
  status: 'idle',
};

export const requestOtp = createAsyncThunk<
  { token: string; email: string },
  string,
  { rejectValue: string }
>('forgotPassword/requestOtp', async (email, { rejectWithValue }) => {
  try {
    const res = await api.requestOtp(email);
    console.log("API Response:", res);
    
    const token = res.token || res.accessToken;
    if (!token) {
      throw new Error('No token received from server');
    }
    
    localStorage.setItem('forget-token', token);
    return { token, email };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const verifyOtp = createAsyncThunk<
  { accessToken: string },
  { otp: string; token: string },
  { rejectValue: string }
>('forgotPassword/verifyOtp', async (body, { rejectWithValue }) => {
  try {
    const res = await api.verifyOtp(body);
    console.log("Verify OTP Response:", res);
    
    const accessToken = res.accessToken || res.token;
    if (!accessToken) {
      throw new Error('No access token received from server');
    }
    
    localStorage.setItem('forget-access-token', accessToken);
    return { accessToken };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const resendOtp = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('forgotPassword/resendOtp', async (token, { rejectWithValue }) => {
  try {
    await api.resendOtp(token);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { password: string; accessToken: string },
  { rejectValue: string }
>('forgotPassword/resetPassword', async (body, { rejectWithValue }) => {
  try {
    await api.resetPassword(body);
    localStorage.removeItem('forget-token');
    localStorage.removeItem('forget-access-token');
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    clearState: (state) => {
      localStorage.removeItem('forget-token');
      localStorage.removeItem('forget-access-token');
      return initialState;
    },
    setStep:(state,action)=>{
      state.step=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(requestOtp.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.step = 'otp';
        s.authToken = a.payload.token;
        s.email = a.payload.email;
      })
      .addCase(requestOtp.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload ?? 'Something went wrong';
      })
      .addCase(verifyOtp.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(verifyOtp.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.step = 'reset';
        s.accessToken = a.payload.accessToken;
      })
      .addCase(verifyOtp.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload ?? 'Invalid OTP';
      })
      .addCase(resendOtp.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(resendOtp.fulfilled, (s) => {
        s.status = 'succeeded';
      })
      .addCase(resendOtp.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload ?? 'Could not resend OTP';
      })
      /* --- /reset-password --- */
      .addCase(resetPassword.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(resetPassword.fulfilled, () => initialState)
      .addCase(resetPassword.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.payload ?? 'Password reset failed';
      });
  },
});

export const { clearState,setStep } = forgotPasswordSlice.actions;
export const selectForgot = (state: RootState) => state.forgotPassword;
export default forgotPasswordSlice.reducer;