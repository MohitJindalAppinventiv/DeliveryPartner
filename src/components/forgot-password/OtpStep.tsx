import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  resendOtp,
  selectForgot,
  verifyOtp,
} from '../../store/slices/forgotPasswordSlice';
import { useOtpTimer } from '../../hooks/useOtpTimer';
import { ToastError, ToastSuccess } from '../../utils/toast';
import { ToastContainer,Bounce } from 'react-toastify';

const length=6;
export default function OtpStep() {
  const dispatch = useAppDispatch();
  const { authToken, status, error, email } = useAppSelector(selectForgot);
  const { timeLeft, restart } = useOtpTimer(30);

  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs=useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
      inputRefs.current[0]?.focus();
      ToastSuccess("OTP sends to your Email Address");
  
    }, []);


  const onVerify = () => {
    // Use authToken from Redux state first, then fallback to localStorage
    const token = authToken || localStorage.getItem('forget-token') || '';
    const combinedOtp:string=otp.join("");
    console.log(combinedOtp);
    
    if (!token) {
      return alert('No auth token found. Please restart the process.');
    }
    
    console.log('Using token:', token);
    dispatch(verifyOtp({ otp:combinedOtp, token }));
  };

  const onResend = async () => {

    const token = authToken || localStorage.getItem('forget-token') || '';
    
    if (!token) {
      return alert('No auth token found. Please restart the process.');
    }
    
    try {
      await dispatch(resendOtp(token));
      ToastSuccess("OTP send to your email Address")
      
    } catch (error:any) {
      ToastError("Invalid OTP")
    }
    
    restart();
  };

  const handleChange=(index:number,e:React.ChangeEvent<HTMLInputElement>)=>{
      const value=e.target.value;
      if(isNaN(Number(value))) return;

      const newOtp=[...otp];
      newOtp[index]=value.slice(-1);
      setOtp(newOtp);

      if(value && index<length-1){
        inputRefs.current[index+1]?.focus();
      }
  };

  const handleKeyDown=(index:number,e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Backspace" && !otp[index] && index>0){
      inputRefs.current[index-1]?.focus();
    }
  }

  const handleClick=(index:number)=>{
    if(index>0 && !otp[index-1]){
      const firstEmpty=otp.indexOf("");
      inputRefs.current[firstEmpty]?.focus();
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Enter OTP</h1>
      <p className="text-sm text-gray-600">
        We have sent an OTP to <span className="font-medium">{email}</span>.
      </p>
      {/* <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="123456"
        className="w-full rounded border px-3 py-2 tracking-widest"
        maxLength={6}
      /> */}
      <div className='flex justify-center gap-3 mb-4'>


      {otp.map((value,index)=>(
        <input
        key={index}
        type='text'
        inputMode='numeric'
        maxLength={1}
        value={value}
        ref={(el)=>inputRefs.current[index]=el}
        onChange={(e)=>handleChange(index,e)}
        onKeyDown={(e)=>handleKeyDown(index,e)}
        onClick={()=>handleClick(index)}
        className="w-12 h-14 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl font-semibold transition-all"
        
        />
      ))}
      </div>

      <button
        onClick={onVerify}
        disabled={status === 'loading' || otp.join("").length!==length}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
          status=="loading" || otp.join("").length !== length
            ? "bg-orange-400 cursor-not-allowed"
            : "bg-orange-600 hover:bg-orange-700"
        }`}
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

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}