import { useForm,useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {  updatePersonalInfo,  updateVehicleDetails,  updateDocuments,  resetSignup,
} from "../../store/slices/signupSlice";
import { type RootState } from "../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { ToastError, ToastSuccess } from "../../utils/toast";
import axios from "axios";
import ENDPOINTS from "../../api/Endpoints";
import { motion } from "framer-motion";
// List of Indian states for dropdown
const indianStates = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar", "Chhattisgarh","Delhi","Goa", "Gujarat", "Haryana", "Himachal Pradesh","Jharkhand","Karnataka",  "Kerala", "Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand","West Bengal",];
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const mobileRegex = /^[6-9]\d{9}$/;

// zod schema
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().regex(mobileRegex,"Mobile number must be a valid 10-digit Indian number"),
    dob: z.string().refine(
      (val) => {
        const dob = new Date(val);
        const today = new Date();
        const ageDiff = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        const isAtLeast18 =ageDiff > 18 || (ageDiff === 18 && (m > 0 || (m === 0 && dayDiff >= 0)));
        return isAtLeast18;
      },
      {
        message: "You must be at least 18 years old.",
      }
    ),
    password: z.string().regex(passwordRegex,"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
    confirmPassword: z.string(),
    permanentAddress: z.string().min(5, "Address must be at least 5 characters"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
    state: z.enum(indianStates as [string,...string[]], {
      errorMap: () => ({ message: "Please select a state" }),
    }),
    vehicleType: z.enum(["SCOOTER", "BIKE", "BICYCLE"], {
      errorMap: () => ({ message: "Please select a vehicle type" }),
    }),
    vehicleColor: z.string().optional(),
    vehicleNumber: z.string().optional(),
    aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
    dlNumber: z.string().optional(),
    rcNumber: z.string().optional(),
    profilePic: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.vehicleType === "BICYCLE") return true;
      return !!data.dlNumber && !!data.rcNumber && !!data.vehicleNumber;
    },
    {
      message: "DL, RC, and Vehicle Number required for Scooter/Bike",
      path: ["dlNumber"],
    }
  );

type FormSchema = z.infer<typeof formSchema>;

export default function Step3ProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.signUpReducer.email);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const mobile = useWatch({ control, name: "mobile" });
  const dob = useWatch({ control, name: "dob" });

  const passwordsMatch = password === confirmPassword;
  const isStrongPassword = passwordRegex.test(password || "");
  const vehicleType = watch("vehicleType");

  // Helper functions for real-time validation display
  const isMobileValid = (mobileNumber: string | undefined) => {
    if (!mobileNumber) return false;
    return mobileRegex.test(mobileNumber);
  };

  const isAgeValid = (dobString: string | undefined) => {
    if (!dobString) return false;
    const dobDate = new Date(dobString);
    const today = new Date();
    const ageDiff = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();
    return (
      ageDiff > 18 || (ageDiff === 18 && (m > 0 || (m === 0 && dayDiff >= 0)))
    );
  };

  // API call function
  const submitRegistration = async (data: FormSchema) => {
    const payload = {
      // top-level fields
      name: data.name.trim(),
      mobileNumber: `+91${data.mobile}`,
      password: data.password,
      dob: data.dob,
      permanentAddress: data.permanentAddress,
      vehicleDetails:
        data.vehicleType === "BICYCLE"
          ? { vehicleType: "BICYCLE" }
          : {
              vehicleType: data.vehicleType.toUpperCase() as "BIKE" | "SCOOTER",
              vehicleNumber: data.vehicleNumber,
              vehicleColor: data.vehicleColor ?? "",
            },
      documents: {
        aadhaar: data.aadhaarNumber,
        ...(data.vehicleType !== "BICYCLE" && {
          rc: data.rcNumber,
          dl: data.dlNumber,
        }),
      },
    };

    try {
      console.log(payload);
      const token = localStorage.getItem("usersubmit");
      console.log("submit", token);
      const response = await axiosInstance.post(
        `${ENDPOINTS.REGISTER}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      ToastSuccess("User Registered Successfully");
      dispatch(resetSignup());
        navigate("/login", {
          state: {
            message:
              "Registration successful! Please login with your credentials.",
            email: email,
          },
        });
;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ToastError("Bad Request! Please Enter all the Fields");
      }
      console.error("Registration error:", error);
      throw error;
    }
  };

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      console.log("Starting registration...");

      dispatch(
        updatePersonalInfo({
          name: data.name,
          email: email,
          mobile: data.mobile,
          dob: data.dob,
          password: data.password,
          confirmPassword: data.confirmPassword,
          permanentAddress: data.permanentAddress,
          pincode: data.pincode,
          state: data.state,
        })
      );
      dispatch(
        updateVehicleDetails({
          vehicleType: data.vehicleType,
          vehicleColor: data.vehicleColor,
          vehicleNumber:
            data.vehicleType !== "BICYCLE" ? data.vehicleNumber : "",
        })
      );
      dispatch(
        updateDocuments({
          aadhaar: data.aadhaarNumber,
          dl: data.vehicleType !== "BICYCLE" ? data.dlNumber : "",
          rc: data.vehicleType !== "BICYCLE" ? data.rcNumber : "",
          profilePic: data.profilePic || "",
        })
      );

      await submitRegistration(data);
    } catch (error) {
      ToastError("Registration Failed. Please try again");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 flex items-center justify-center bg-gray-50"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl space-y-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-700">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 mt-2">
            Fill in your details to complete registration
          </p>
        </div>

        {/* Personal Info */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 flex items-center">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                {...register("name")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input
                {...register("mobile")}
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
              {/* Real-time validation for mobile */}
              {mobile && !isMobileValid(mobile) && !errors.mobile && (
                <p className="text-yellow-600 text-sm mt-1">
                  ⚠️ Mobile number must be a valid 10-digit Indian number
                </p>
              )}
              {mobile && isMobileValid(mobile) && !errors.mobile && (
                <p className="text-green-600 text-sm mt-1">
                  ✅ Valid mobile number
                </p>
              )}
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                placeholder="Email from previous step"
              />
              <p className="text-xs text-gray-500 mt-1">✓ Email verified</p>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                {...register("dob")}
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              />
              {/* Real-time validation for DOB */}
              {dob && !isAgeValid(dob) && !errors.dob && (
                <p className="text-yellow-600 text-sm mt-1">
                  ⚠️ You must be at least 18 years old.
                </p>
              )}
              {dob && isAgeValid(dob) && !errors.dob && (
                <p className="text-green-600 text-sm mt-1">
                  ✅ Age requirement met
                </p>
              )}
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Create a strong password"
              />
              {password && !isStrongPassword && (
                <p className="text-yellow-600 text-sm mt-1">
                  ⚠️ Password must be stronger
                </p>
              )}
              {password && isStrongPassword && (
                <p className="text-green-600 text-sm mt-1">
                  ✅ Strong password
                </p>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
              {confirmPassword &&
                !passwordsMatch &&
                !errors.confirmPassword && (
                  <p className="text-yellow-600 text-sm mt-1">
                    ⚠️ Passwords do not match
                  </p>
                )}
              {confirmPassword && passwordsMatch && !errors.confirmPassword && (
                <p className="text-green-600 text-sm mt-1">
                  ✅ Passwords match
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-gray-700 mb-1">
                Permanent Address *
              </label>
              <textarea
                {...register("permanentAddress")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                rows={3}
                placeholder="Enter your complete address"
              />
              {errors.permanentAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.permanentAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Pincode *
              </label>
              <input
                {...register("pincode")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="6-digit pincode"
                maxLength={6}
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                State *
              </label>
              <select
                {...register("state")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              >
                <option value="">Select your state</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Vehicle Info */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 flex items-center">
            Vehicle Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Vehicle Type *
              </label>
              <select
                {...register("vehicleType")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              >
                <option value="">Select vehicle type</option>
                <option value="SCOOTER">Scooter</option>
                <option value="BIKE">Bike</option>
                <option value="BICYCLE">Bicycle</option>
              </select>
              {errors.vehicleType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehicleType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Vehicle Color
              </label>
              <input
                {...register("vehicleColor")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="e.g., Red, Blue, Black"
              />
            </div>

            {vehicleType !== "BICYCLE" && (
              <>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Vehicle Number *
                  </label>
                  <input
                    {...register("vehicleNumber")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="e.g., MH01AB1234"
                  />
                  {errors.vehicleNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.vehicleNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Driving License Number *
                  </label>
                  <input
                    {...register("dlNumber")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Enter DL number"
                  />
                  {errors.dlNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dlNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    RC Number *
                  </label>
                  <input
                    {...register("rcNumber")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Enter RC number"
                  />
                  {errors.rcNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rcNumber.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Documents Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 flex items-center">
            Document Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Aadhaar Number *
              </label>
              <input
                {...register("aadhaarNumber")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="12-digit Aadhaar number"
                maxLength={12}
              />
              {errors.aadhaarNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aadhaarNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Profile Picture URL
              </label>
              <input
                {...register("profilePic")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="https://example.com/profile.jpg (Optional)"
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg shadow-lg font-semibold text-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-red-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-[1.02]"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                Registering...
              </div>
            ) : (
              "Complete Registration"
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>* Required fields</p>
        </div>
      </form>
    </motion.div>
  );
}
