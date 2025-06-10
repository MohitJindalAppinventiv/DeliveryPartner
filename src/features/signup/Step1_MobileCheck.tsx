// src/features/signup/Step1_MobileCheck.tsx
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../../store/store';
import { setMobile, nextStep } from '../../store/signupSlice';
import { motion } from 'framer-motion';

export default function Step1MobileCheck() {
  const dispatch = useDispatch();
  const mobile = useSelector((state: RootState) => state.signUpReducer.mobile);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const navigate=useNavigate();


  const handleCheckMobile = async () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      setShowSignIn(false);
      return;
    }

    setLoading(true);
    setError('');
    setShowSignIn(false);
    try {
      // Simulate API call
    //   const res = await axios.post('/api/check-mobile', { mobile });
    const res={
        data:{
            exists:false,
        }
    }
      if (res.data.exists) {
        setError('Mobile number already exists. Try LogIn');
        setShowSignIn(true);
      } else {
        // await axios.post('/api/send-otp', { mobile }); // <== ADD THIS
        dispatch(nextStep());
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md mx-auto mt-10 p-8 rounded-lg  shadow-lg bg-white">
  <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
        <p className="text-gray-600">Enter your mobile number to get started</p>
      </div>

      <div className="mb-6">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">+91</span>
          </div>
          <input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => dispatch(setMobile(e.target.value))}
            placeholder="9876543210"
            className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            maxLength={10}
          />
        </div>
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </div>
      <button
        onClick={handleCheckMobile}
        disabled={loading || !mobile}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
          loading || !mobile
            ? 'bg-red-400 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying...
          </span>
        ) : (
          'Continue'
        )}
      </button>
      {showSignIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 mb-2">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Sign In instead
          </button>
        </motion.div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </motion.div>
  );
}

/*


*/
