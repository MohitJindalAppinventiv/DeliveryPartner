
const ENDPOINTS = {
  
  // Authentication - Delivery Partner
  REGISTER_EMAIL: "/auth/deliveryPartner/registerEmail",
  REGISTER: "/auth/deliveryPartner/register",
  LOGIN: "/auth/deliveryPartner/login",
  LOGOUT: "/auth/deliveryPartner/logout",
  CHANGE_PASSWORD: "/auth/deliveryPartner/changePassword",
  FORGOT_PASSWORD: "/auth/deliveryPartner/forgotPassword",
  RESEND_OTP: "/auth/deliveryPartner/resendOtp",
  VERIFY_OTP: "/auth/deliveryPartner/verifyOtp",
  UPDATE_PASSWORD: "/auth/deliveryPartner/updatePassword",

  // Delivery Partners
  GET_PROFILE: "/deliveryPartners/getProfile",
  UPDATE_STATUS: "/deliveryPartners/status",
  GET_EARNINGS: (period: "daily" | "weekly" | "monthly" | "yearly") => `/deliveryPartners/earnings/${period}`,

  // Delivery Management
  MARK_DELIVERED: "/delivery/delivered",
  DELIVERY_HISTORY: "/delivery/deliveryHistory",
};

Object.freeze(ENDPOINTS);

export default ENDPOINTS;
