// // src/features/signup/Step2_OtpVerification.tsx
// import { useState, useRef, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { nextStep, setOtpVerified } from '../../store/signupSlice';

// export default function Step2OtpVerification() {
//   const dispatch = useDispatch();
//   const length = 6;

//   const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [timer,setTimer]=useState(60);
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   useEffect(()=>{
//     let interval:NodeJS.Timeout;
//     if(timer>0){
//         interval=setInterval(()=>{
//             setTimer((prev)=>prev-1);
//         },1000)
//     }
//     return ()=>clearInterval(interval);
//   },[timer])

//   const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (isNaN(Number(value))) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);

//     if (value && index < length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleClick = (index: number) => {
//     if (index > 0 && !otp[index - 1]) {
//       const firstEmpty = otp.indexOf('');
//       inputRefs.current[firstEmpty]?.focus();
//     }
//   };

//   const handleVerifyOtp = async () => {
//     const combinedOtp = otp.join('');

//     if (!/^\d{4,6}$/.test(combinedOtp)) {
//       setError('Please enter a valid OTP');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       // const res = await axios.post('/api/verify-otp', { otp: combinedOtp });
//       const res = { data: { verified: true } };

//       if (res.data.verified) {
//         dispatch(setOtpVerified(true));
//         dispatch(nextStep());
//       } else {
//         setError('Invalid OTP');
//       }
//     } catch (err) {
//       setError('Verification failed. Try again.');
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       // Simulate resend API
//       // await axios.post('/api/resend-otp', { phone });
//       console.log('Resent OTP');
//       setTimer(60);
//       setOtp(Array(length).fill(''));
//       inputRefs.current[0]?.focus();
//       setError('');
//     } catch (err) {
//       setError('Failed to resend OTP');
//       console.log(err);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
//       <h2 className="text-xl font-semibold mb-4">Step 2: Verify OTP</h2>
//       <p className="text-sm text-gray-600 mb-4">Enter the OTP sent to your mobile number</p>

//       <div className="flex justify-center gap-2 mb-4">
//         {otp.map((value, index) => (
//           <input
//             key={index}
//             type="text"
//             inputMode="numeric"
//             maxLength={1}
//             value={value}
//             ref={(el) => (inputRefs.current[index] = el)}
//             onChange={(e) => handleChange(index, e)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             onClick={() => handleClick(index)}
//             className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
//           />
//         ))}
//       </div>

//       {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

//       <button
//         onClick={handleVerifyOtp}
//         disabled={loading || otp.join('').length !== length}
//         className="w-full bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         {loading ? 'Verifying...' : 'Verify & Next'}
//       </button>
//       <div className='mt-4 text-center text-sm'>
//         {timer>0 ? (
//             <div className='text-gray-600' >Resend OTP in {timer} second{timer!==1 ? 's':''}</div>
//         ):(
//             <button onClick={handleResendOtp} className='text-red-600 font-medium hover:underline'>
//                 Resend OTP
//             </button>
//         )}
//       </div>
//     </div>
//   );
// }

// src/features/signup/Step2_EmailVerification.tsx
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setOtpVerified } from '../../store/signupSlice';
import { type RootState } from '../../store/store';
import { motion } from 'framer-motion';

export default function Step2EmailVerification() {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.signUpReducer.email);
  const length = 6;

  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    if (index > 0 && !otp[index - 1]) {
      const firstEmpty = otp.indexOf('');
      inputRefs.current[firstEmpty]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const combinedOtp = otp.join('');

    if (!/^\d{4,6}$/.test(combinedOtp)) {
      setError('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // const res = await axios.post('/api/verify-email-otp', { email, otp: combinedOtp });
      const res = { data: { verified: true } };

      if (res.data.verified) {
        dispatch(setOtpVerified(true));
        dispatch(nextStep());
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed. Try again.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Simulate resend API
      // await axios.post('/api/resend-email-otp', { email });
      console.log('Resent OTP to email');
      setTimer(60);
      setOtp(Array(length).fill(''));
      inputRefs.current[0]?.focus();
      setError('');
    } catch (err) {
      setError('Failed to resend OTP');
      console.log(err);
    }
  };

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
      ? username.substring(0, 2) + '*'.repeat(username.length - 2)
      : username;
    return `${maskedUsername}@${domain}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg bg-white"
    >
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
        <p className="text-gray-600 text-sm">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-gray-800 font-medium">{maskEmail(email)}</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
          Enter Verification Code
        </label>
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onClick={() => handleClick(index)}
              className="w-12 h-14 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl font-semibold transition-all"
            />
          ))}
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center mb-4"
          >
            {error}
          </motion.p>
        )}
      </div>

      <button
        onClick={handleVerifyOtp}
        disabled={loading || otp.join('').length !== length}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
          loading || otp.join('').length !== length
            ? 'bg-orange-400 cursor-not-allowed'
            : 'bg-orange-600 hover:bg-orange-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            Verifying...
          </span>
        ) : (
          'Verify & Continue'
        )}
      </button>

      <div className='mt-6 text-center text-sm'>
        {timer > 0 ? (
          <div className='text-gray-600'>
            Didn't receive the code? Resend in {timer} second{timer !== 1 ? 's' : ''}
          </div>
        ) : (
          <button 
            onClick={handleResendOtp} 
            className='text-blue-600 font-medium hover:text-blue-800 transition-colors hover:underline'
          >
            Resend Verification Code
          </button>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Check your spam folder if you don't see the email in your inbox
        </p>
      </div>
    </motion.div>
  );
}