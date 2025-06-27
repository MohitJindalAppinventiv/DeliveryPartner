import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type RootState } from "../../store/store";
import { setEmail, nextStep } from "../../store/slices/signupSlice";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { Bounce, ToastContainer } from "react-toastify";
import { ToastError, ToastSuccess } from "../../utils/toast";
import axios from "axios";
import ENDPOINTS from "../../api/Endpoints";

export default function Step1EmailCheck() {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.signUpReducer.email);
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [showSignIn, setShowSignIn] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCheckEmail = async () => {
    if (!validateEmail(email)) {
      ToastError("Please Enter a valid Email Address");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`${ENDPOINTS.REGISTER_EMAIL}`, {
        email,
      });

      ToastSuccess("Email Registered");

      console.log(res);
      localStorage.setItem("email-token", res.data.accessToken);
      setTimeout(() => {
        dispatch(nextStep());
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        if (err.response?.status === 400) {
          ToastError("Email Already Exists! Try login");
        } else {
          ToastError("Something Wents Wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg bg-white"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
        <p className="text-gray-600">Enter your email address to get started</p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
            }}
            placeholder="@example@email.com"
            className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <Link to={"/login"}>
            <div className="text-red-400 text-sm">
              {" "}
              Already Have a Account? Try Login
            </div>
          </Link>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />

      <button
        onClick={handleCheckEmail}
        disabled={loading || !email}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
          loading || !email
            ? "bg-orange-400 cursor-not-allowed"
            : "bg-orange-600 hover:bg-orange-700"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">Verifying...</span>
        ) : (
          "Continue"
        )}
      </button>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </motion.div>
  );
}
