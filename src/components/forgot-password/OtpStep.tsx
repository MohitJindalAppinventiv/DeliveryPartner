// import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
// import {
//   resendOtp,
//   selectForgot,
//   verifyOtp,
// } from '../../store/forgotPasswordSlice';
// import { useOtpTimer } from '../../hooks/useOtpTimer';

// export default function OtpStep() {
//   const dispatch = useAppDispatch();
//   const { authToken, status, error, email } = useAppSelector(selectForgot);
//   const { timeLeft, restart } = useOtpTimer(30);
//   const [otp, setOtp] = useState('');

//   const onVerify = () =>{

//     const token=localStorage.getItem('forget-token');
//     console.log(token)
//     dispatch(verifyOtp({ otp, token})); // authToken exists here
//   }

//   const onResend = async () => {
//     await dispatch(resendOtp(authToken!));
//     restart();
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Enter OTP</h1>
//       <p className="text-sm text-gray-600">
//         We have sent an OTP to <span className="font-medium">{email}</span>.
//       </p>
//       <input
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="123456"
//         className="w-full rounded border px-3 py-2 tracking-widest"
//       />
//       <button
//         onClick={onVerify}
//         disabled={status === 'loading'}
//         className="w-full rounded bg-green-600 py-2 text-white disabled:opacity-50"
//       >
//         {status === 'loading' ? 'Verifying…' : 'Verify OTP'}
//       </button>

//       <button
//         onClick={onResend}
//         disabled={timeLeft > 0 || status === 'loading'}
//         className="w-full rounded bg-gray-200 py-2 text-sm disabled:opacity-50"
//       >
//         {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend OTP'}
//       </button>

//       {error && <p className="text-sm text-red-600">{error}</p>}
//     </div>
//   );
// }


// OtpStep.tsx
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  resendOtp,
  selectForgot,
  verifyOtp,
} from '../../store/forgotPasswordSlice';
import { useOtpTimer } from '../../hooks/useOtpTimer';

export default function OtpStep() {
  const dispatch = useAppDispatch();
  const { authToken, status, error, email } = useAppSelector(selectForgot);
  const { timeLeft, restart } = useOtpTimer(30);
  const [otp, setOtp] = useState('');

  const onVerify = () => {
    // Use authToken from Redux state first, then fallback to localStorage
    const token = authToken || localStorage.getItem('forget-token') || '';
    
    if (!token) {
      return alert('No auth token found. Please restart the process.');
    }
    
    console.log('Using token:', token);
    dispatch(verifyOtp({ otp, token }));
  };

  const onResend = async () => {
    const token = authToken || localStorage.getItem('forget-token') || '';
    
    if (!token) {
      return alert('No auth token found. Please restart the process.');
    }
    
    await dispatch(resendOtp(token));
    restart();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Enter OTP</h1>
      <p className="text-sm text-gray-600">
        We have sent an OTP to <span className="font-medium">{email}</span>.
      </p>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="123456"
        className="w-full rounded border px-3 py-2 tracking-widest"
        maxLength={6}
      />
      <button
        onClick={onVerify}
        disabled={status === 'loading' || !otp}
        className="w-full rounded bg-green-600 py-2 text-white disabled:opacity-50"
      >
        {status === 'loading' ? 'Verifying…' : 'Verify OTP'}
      </button>

      <button
        onClick={onResend}
        disabled={timeLeft > 0 || status === 'loading'}
        className="w-full rounded bg-gray-200 py-2 text-sm disabled:opacity-50"
      >
        {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend OTP'}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}