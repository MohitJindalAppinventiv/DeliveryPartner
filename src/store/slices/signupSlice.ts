
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PersonalInfo {
  name: string;
  email: string;
  mobile: string; 
  dob: string;
  password: string;
  confirmPassword: string;
  permanentAddress: string;
  pincode: string;
  state: string;
}


interface VehicleDetails {
  vehicleType: string;
  vehicleColor?: string;
  vehicleNumber?: string;
}

interface Documents {
  aadhaar: string;
  dl?: string;
  rc?: string;
  profilePic?: string;
}

interface SignupState {
  step: number;
  email: string;
  otpVerified: boolean;
  personalInfo: PersonalInfo;
  vehicleDetails: VehicleDetails;
  documents: Documents;
}

const initialState: SignupState = {
  step: 1,
  email: '',
  otpVerified: false,
  personalInfo: {
    name: '',
    email: '',
    mobile: '', 
    dob: '',
    password: '',
    confirmPassword: '',
    permanentAddress: '',
    pincode: '',
    state: '',
  },
  vehicleDetails: {
    vehicleType: '',
    vehicleColor: '',
    vehicleNumber: '',
  },
  documents: {
    aadhaar: '',
    dl: '',
    rc: '',
    profilePic: '',
  },
};


const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state,action) => {
      if(action.payload && state.step==3){
        state.step-=2;
      }
      if (state.step > 1) {
        state.step -= 1;
      }
    },
    setOtpVerified: (state, action: PayloadAction<boolean>) => {
      state.otpVerified = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    updateVehicleDetails: (state, action: PayloadAction<VehicleDetails>) => {
      state.vehicleDetails = action.payload;
    },
    updateDocuments: (state, action: PayloadAction<Documents>) => {
      state.documents = action.payload;
    },
    resetSignup: () => {
      return initialState;
    },
  },
});

export const {
  setEmail,
  nextStep,
  prevStep,
  setOtpVerified,
  updatePersonalInfo,
  updateVehicleDetails,
  updateDocuments,
  resetSignup,
} = signupSlice.actions;

export default signupSlice.reducer;