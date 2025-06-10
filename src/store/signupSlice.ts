// src/features/signup/signupSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type VehicleType = 'Scooter' | 'Bike' | 'Bicycle';

interface SignupState {
  step: number;
  mobile: string;
  otpVerified: boolean;
  personalInfo: {
    name: string;
    email: string;
    dob: string;
    password: string;
    confirmPassword: string;
    permanentAddress: string;
    pincode: string;
    state: string;
  };
  vehicleDetails: {
    vehicleType: VehicleType;
    vehicleNumber: string | undefined;
    vehicleColor: string |undefined;
  };
  documents: {
    profilePic: string;
    rc: string | undefined;
    aadhaar: string;
    dl: string | undefined;
  };
}

const initialState: SignupState = {
  step: 1,
  mobile: '',
  otpVerified: false,
  personalInfo: {
    name: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    permanentAddress: '',
    pincode: '',
    state: '',
  },
  vehicleDetails: {
    vehicleType: 'Scooter',
    vehicleNumber: '',
    vehicleColor: '',
  },
  documents: {
    profilePic: '',
    rc: '',
    aadhaar: '',
    dl: '',
  },
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    nextStep: (state) => { state.step += 1; },
    prevStep: (state) => { state.step -= 1; },
    setMobile: (state, action: PayloadAction<string>) => { state.mobile = action.payload; },
    setOtpVerified: (state, action: PayloadAction<boolean>) => { state.otpVerified = action.payload; },
    updatePersonalInfo: (state, action: PayloadAction<SignupState['personalInfo']>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateVehicleDetails: (state, action: PayloadAction<SignupState['vehicleDetails']>) => {
      state.vehicleDetails = { ...state.vehicleDetails, ...action.payload };
    },
    updateDocuments: (state, action: PayloadAction<SignupState['documents']>) => {
      state.documents = { ...state.documents, ...action.payload };
    },
    resetSignup: () => initialState,
  },
});

export const {
  nextStep,
  prevStep,
  setMobile,
  setOtpVerified,
  updatePersonalInfo,
  updateVehicleDetails,
  updateDocuments,
  resetSignup,
} = signupSlice.actions;

export default signupSlice.reducer;
