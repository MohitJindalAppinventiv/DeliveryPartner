import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { selectForgot,setStep } from "../../store/slices/forgotPasswordSlice";
import EmailStep from "../../components/forgot-password/EmailStep";
import OtpStep from "../../components/forgot-password/OtpStep";
import ResetPasswordStep from "../../components/forgot-password/ResetPasswordStep";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// export default function ForgotPasswordPage() {
//   const { step } = useAppSelector(selectForgot);
//   const navigate=useNavigate();

//   const handleResetStep=()=>{
//     if(step=="email"){
//       navigate('/login');
//     }
//     else{
//         navigate('/forgot-password')
//     }
//   }

  

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-4xl mx-auto px-6 pt-6">
//         <button
//           onClick={handleResetStep}
//           className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
//         >
//           <ArrowLeft
//             size={20}
//             className="group-hover:-translate-x-1 transition-transform"
//           />
//           <span className="text-sm font-medium">
//             {"Back to Home"}
//           </span>
//         </button>
//       </div>
//       <div className="p-6">
//         {step === "email" && <EmailStep />}
//         {step === "otp" && <OtpStep />}
//         {step === "reset" && <ResetPasswordStep />}
//       </div>
//     </main>
//   );
// }


export default function ForgotPasswordPage() {
  const { step } = useAppSelector(selectForgot);
  const navigate = useNavigate();
  const dispatch=useAppDispatch();

  const handleResetStep = () => {
    console.log("handleReset step calling")
    if (step === "email") {
      navigate("/login");
    } else {
      dispatch(setStep("email"));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 relative">
      <button
        onClick={handleResetStep}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-md">
        {step === "email" && <EmailStep />}
        {step === "otp" && <OtpStep />}
        {step === "reset" && <ResetPasswordStep />}
      </div>
    </main>
  );
}
