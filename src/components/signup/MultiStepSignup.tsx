// // features/signup/MultiStepSignup.tsx
// import { useSelector } from "react-redux";
// import Step1EmailCheck from "./Step1_MobileCheck";
// import Step2EmailVerification from "./Step2_OtpVerification";
// import Step3ProfileForm from "./Step3_ProfileForm";
// import type { RootState } from "../../store/store";

// export default function MultiStepSignup() {
//   const step = useSelector((state: RootState) => state.signUpReducer.step);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Progress Indicator */}
//       <div className="w-full bg-white shadow-sm">
//         <div className="max-w-4xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-8">
//               {/* Step 1 */}
//               <div className="flex items-center">
//                 <div
//                   className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                     step >= 1
//                       ? "bg-red-600 border-red-600 text-white"
//                       : "border-gray-300 text-gray-400"
//                   }`}
//                 >
//                   {step > 1 ? (
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   ) : (
//                     <span className="text-sm font-semibold">1</span>
//                   )}
//                 </div>
//                 <span
//                   className={`ml-3 text-sm font-medium ${
//                     step >= 1 ? "text-red-600" : "text-gray-400"
//                   }`}
//                 >
//                   Email Verification
//                 </span>
//               </div>

//               {/* Connector */}
//               <div
//                 className={`flex-1 h-1 ${
//                   step > 1 ? "bg-red-600" : "bg-gray-200"
//                 }`}
//               ></div>

//               {/* Step 2 */}
//               <div className="flex items-center">
//                 <div
//                   className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                     step >= 2
//                       ? "bg-red-600 border-red-600 text-white"
//                       : "border-gray-300 text-gray-400"
//                   }`}
//                 >
//                   {step > 2 ? (
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   ) : (
//                     <span className="text-sm font-semibold">2</span>
//                   )}
//                 </div>
//                 <span
//                   className={`ml-3 text-sm font-medium ${
//                     step >= 2 ? "text-red-600" : "text-gray-400"
//                   }`}
//                 >
//                   Verify Code
//                 </span>
//               </div>

//               {/* Connector */}
//               <div
//                 className={`flex-1 h-1 ${
//                   step > 2 ? "bg-red-600" : "bg-gray-200"
//                 }`}
//               ></div>

//               {/* Step 3 */}
//               <div className="flex items-center">
//                 <div
//                   className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                     step >= 3
//                       ? "bg-red-600 border-red-600 text-white"
//                       : "border-gray-300 text-gray-400"
//                   }`}
//                 >
//                   <span className="text-sm font-semibold">3</span>
//                 </div>
//                 <span
//                   className={`ml-3 text-sm font-medium ${
//                     step >= 3 ? "text-red-600" : "text-gray-400"
//                   }`}
//                 >
//                   Complete Profile
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Step Content */}
//       <div className="p-6">
//         {step === 1 && <Step1EmailCheck />}
//         {step === 2 && <Step2EmailVerification />}
//         {step === 3 && <Step3ProfileForm />}
//       </div>
//     </div>
//   );
// }


import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react"; // Icon
import Step1EmailCheck from "./Step1_MobileCheck";
import Step2EmailVerification from "./Step2_OtpVerification";
import Step3ProfileForm from "./Step3_ProfileForm";
import type { RootState } from "../../store/store";
import  { resetSignup } from '../../store/signupSlice';
import type { AppDispatch } from "../../store/store";
export default function MultiStepSignup() {
  const step = useSelector((state: RootState) => state.signUpReducer.step);
  const dispatch=useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleResetStep=()=>{
    dispatch(resetSignup());
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back to Home Button */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Link 
          to="/" 
          onClick={handleResetStep}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Progress Indicator */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Steps (unchanged)... */}
              {/* Step 1, Connector, Step 2, Connector, Step 3 */}
              {/* ... */}
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {step === 1 && <Step1EmailCheck />}
        {step === 2 && <Step2EmailVerification />}
        {step === 3 && <Step3ProfileForm />}
      </div>
    </div>
  );
}
