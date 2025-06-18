// src/components/Login.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../../store/authSlice"; // Import the loginUser thunk
import { loginschema, type LoginFormData } from "../../validations/loginValidation"; // Assuming you have the zod schema defined elsewhere
import type { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ArrowLeft } from "lucide-react";

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginschema),
    mode: "onChange",
  });

  const email = watch("email");

  const { status, error: reduxError } = useSelector((state: RootState) => state.auth); // Access status and error from the store

  const onSubmit = async (data: LoginFormData) => {
    setError(""); // Clear previous error message

    // Dispatch the loginUser thunk
    try {
        // Dispatch the loginUser async thunk and use .unwrap() to handle success/failure
        await dispatch(loginUser(data)).unwrap();
        navigate(from, { replace: true }); // Navigate after successful login
      } catch (err: any) {
        setError(err); // Show the error message if login fails
      }

    // if (
    //   data.email === "admin@example.com" &&
    //   data.password === "admin123"
    // ) {
    //   // Simulate delay
    //   await new Promise((res) => setTimeout(res, 500));
    //   // Store a dummy token in localStorage for testing (optional)
    //   localStorage.setItem("token", "dummy_token");
    //   navigate(from, { replace: true });
    // } else {
    //   setError("Invalid email or password");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
                <Link 
          to="/" 
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your Password"
              {...register("password")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
            <div className="text-right mt-2">
              <Link to="/forgot-password" 
                className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Display error if it exists */}
          {(error || reduxError) && (
            <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg">
              {error || reduxError}
            </div>
          )}

          <button
            disabled={isSubmitting || status === "loading"}
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-orange-500 hover:text-orange-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;