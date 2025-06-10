// src/features/signup/Step2_OtpVerification.tsx
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { nextStep, setOtpVerified } from '../../store/signupSlice';

export default function Step2OtpVerification() {
  const dispatch = useDispatch();
  const length = 6;

  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer,setTimer]=useState(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(()=>{
    let interval:NodeJS.Timeout;
    if(timer>0){
        interval=setInterval(()=>{
            setTimer((prev)=>prev-1);
        },1000)
    }
    return ()=>clearInterval(interval);
  },[timer])

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
      // const res = await axios.post('/api/verify-otp', { otp: combinedOtp });
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
      // await axios.post('/api/resend-otp', { phone });
      console.log('Resent OTP');
      setTimer(60);
      setOtp(Array(length).fill(''));
      inputRefs.current[0]?.focus();
      setError('');
    } catch (err) {
      setError('Failed to resend OTP');
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Step 2: Verify OTP</h2>
      <p className="text-sm text-gray-600 mb-4">Enter the OTP sent to your mobile number</p>

      <div className="flex justify-center gap-2 mb-4">
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
            className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

      <button
        onClick={handleVerifyOtp}
        disabled={loading || otp.join('').length !== length}
        className="w-full bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify & Next'}
      </button>
      <div className='mt-4 text-center text-sm'>
        {timer>0 ? (
            <div className='text-gray-600' >Resend OTP in {timer} second{timer!==1 ? 's':''}</div>
        ):(
            <button onClick={handleResendOtp} className='text-red-600 font-medium hover:underline'>
                Resend OTP
            </button>
        )}
      </div>
    </div>
  );
}
