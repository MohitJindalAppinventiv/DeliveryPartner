// import axiosInstance from './axiosInstance'; // adjust the path if needed

// // Forgot Password → Step 1: Request OTP (sends OTP + returns auth token)
// export const requestOtp = async (email: string) => {
//   const res = await axiosInstance.post('/auth/delivery-partner/forgot-password', { email });
//   console.log("requesting OTP");
//   console.log("Otp requesting token",res.data);
//   return res.data; // { token: string }
// };

// // Step 2: Verify OTP (auth token in headers → returns access token)
// export const verifyOtp = async (data: { otp: string; token: string }) => {
//   console.log("data",data);
//   const res = await axiosInstance.post(
//     '/auth/delivery-partner/verify-otp',
//     { otp: data.otp },
//     {
//       headers: {
//         Authorization: `Bearer ${data.token}`,
//       },
//     }
//   );
//   console.log("verify otp token",res.data);
//   return res.data; // { accessToken: string }
// };

// // Step 2: Resend OTP (auth token in headers)
// export const resendOtp = async () => {
//   const token=localStorage.getItem('forget-token');
//   const res = await axiosInstance.post(
//     '/authDeliveryPartner/resendOtp',
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   console.log("resend otp token",res.data);
  
//   return res.data;
// };

// // Step 3: Reset Password (access token in headers)
// export const resetPassword = async (data: { password: string; accessToken: string }) => {
//   const res = await axiosInstance.patch(
//     'auth/delivery-partner/update-password',

//     { password: data.password },
//     {
//       headers: {
//         Authorization: `Bearer ${data.accessToken}`,
//       },
//     }
//   );
//   return res.data;
// };

import axiosInstance from './axiosInstance';

// Forgot Password → Step 1: Request OTP (sends OTP + returns auth token)
export const requestOtp = async (email: string) => {
  const res = await axiosInstance.post('/auth/deliveryPartner/forgotPassword', { email });
  console.log("requesting OTP");
  console.log("Otp requesting token", res.data);
  return res.data; // Should return { token: string } or { accessToken: string }
};

// Step 2: Verify OTP (auth token in headers → returns access token)
export const verifyOtp = async (data: { otp: string; token: string }) => {
  console.log("data", data);
  const res = await axiosInstance.post(
    '/auth/deliveryPartner/verifyOtp',
    { otp: data.otp },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  console.log("verify otp token", res.data);
  return res.data; // Should return { accessToken: string }
};

// Step 2: Resend OTP (auth token in headers)
export const resendOtp = async (token: string) => {
  const res = await axiosInstance.post(
    '/auth/deliveryPartner/resendOtp', // Fixed endpoint to match pattern
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

// Step 3: Reset Password (access token in headers)
export const resetPassword = async (data: { password: string; accessToken: string }) => {
  const res = await axiosInstance.patch(
    '/auth/deliveryPartner/updatePassword', // Added leading slash
    { "newPassword": data.password },
    {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    }
  );
  return res.data;
};



// Clean interfaces without unwanted fields
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
  id: string; // transformed from _id
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

// Raw API response interface (what comes from backend)
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

// Transform function to clean the data
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

// export const fetchDeliveryPartners = async (): Promise<DeliveryPartner[]> => {
//   const response = await axiosInstance.get('/api/delivery-partners');
//   // Transform the raw data to clean format
//   return response.data.map(transformDeliveryPartner);
// };

export const fetchDeliveryPartner = async (): Promise<DeliveryPartner> => {
  const data=localStorage.getItem('accessToken');
  const response = await axiosInstance.get(`/deliveryPartners/getProfile`,{
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
  console.log('deliveryPartner',response)
  return transformDeliveryPartner(response.data);
};