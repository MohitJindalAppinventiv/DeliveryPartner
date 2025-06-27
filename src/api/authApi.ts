
import axios from 'axios';
import axiosInstance from './axiosInstance';
import ENDPOINTS from './Endpoints';


const apiUrl=import.meta.env.VITE_API_URL;
// API to Request OTP
export const requestOtp = async (email: string) => {
  const res = await axiosInstance.post(`${ENDPOINTS.FORGOT_PASSWORD}`, { email });
  console.log("requesting OTP");
  console.log("Otp requesting token", res.data);
  return res.data; 
};

// API to Verify OTP
// It will be called after verifyOtp
export const verifyOtp = async (data: { otp: string; token: string }) => {
  console.log("data", data);
  const res = await axiosInstance.post(
    `${ENDPOINTS.VERIFY_OTP}`,
    { otp: data.otp },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  console.log("verify otp token", res.data);
  return res.data;
};

// API for check verify Otp for SignUp
export const verifyOtpEmail = async (data: { otp: string; token: string }) => {
  const emailToken=localStorage.getItem('email-token')
  console.log("data", data);
  const res = await axios.post(
    `${apiUrl}${ENDPOINTS.VERIFY_OTP}`,
    { otp: data.otp },
    {
      headers: {
        Authorization: `Bearer ${emailToken}`,
      },
    }
  );
  console.log("verify otp token", res);
  return res.data;
};

// API for resending the OTP
export const resendOtp = async (token: string) => {
  const res = await axiosInstance.post(
    `${ENDPOINTS.RESEND_OTP}`, 
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("resend otp token", res.data);
  
  return res.data;
};

//  Reset Password (access token in headers)
export const resetPassword = async (data: { password: string; accessToken: string }) => {
  const res = await axiosInstance.patch(
    `${ENDPOINTS.UPDATE_PASSWORD}`, 
    { "newPassword": data.password },
    {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    }
  );
  return res.data;
};



export interface VehicleDetails {
  vehicleType: string;
  vehicleNumber: string;
  vehicleColor: string;
}

export interface Documents {
  rc: string;
  aadhaar: string;
  dl: string;
}

export interface DeliveryPartner {
  id: string; 
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  dob: string;
  permanentAddress: string;
  vehicleDetails: VehicleDetails;
  documents: Documents;
  status: string;
  rating: number;
  totalDeliveries: number;
  totalEarnings: number;
  isActive: boolean;
}

interface RawDeliveryPartner {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  dob: string;
  permanentAddress: string;
  vehicleDetails: {
    vehicleType: string;
    vehicleNumber: string;
    vehicleColor: string;
    _id: string;
  };
  documents: {
    rc: string;
    aadhaar: string;
    dl: string;
    _id: string;
  };
  status: string;
  rating: number;
  totalDeliveries: number;
  totalEarnings: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const transformDeliveryPartner = (raw: RawDeliveryPartner): DeliveryPartner => {
  return {
    id: raw._id,
    name: raw.name,
    email: raw.email,
    mobileNumber: raw.mobileNumber,
    password: raw.password,
    dob: raw.dob,
    permanentAddress: raw.permanentAddress,
    vehicleDetails: {
      vehicleType: raw.vehicleDetails.vehicleType,
      vehicleNumber: raw.vehicleDetails.vehicleNumber,
      vehicleColor: raw.vehicleDetails.vehicleColor,
    },
    documents: {
      rc: raw.documents.rc,
      aadhaar: raw.documents.aadhaar,
      dl: raw.documents.dl,
    },
    status: raw.status,
    rating: raw.rating,
    totalDeliveries: raw.totalDeliveries,
    totalEarnings: raw.totalEarnings,
    isActive: raw.isActive,
  };
};


export const fetchDeliveryPartner = async (): Promise<DeliveryPartner> => {
  const data=localStorage.getItem('accessToken');
  const response = await axiosInstance.get(`${ENDPOINTS.GET_PROFILE}`);
  // console.log('deliveryPartner',response)
  return transformDeliveryPartner(response.data);
};