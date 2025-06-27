import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react"; // Icon
import Step1EmailCheck from "./Step1_MobileCheck";
import Step2EmailVerification from "./Step2_OtpVerification";
import Step3ProfileForm from "./Step3_ProfileForm";
import type { RootState } from "../../store/store";
import { prevStep, resetSignup } from "../../store/slices/signupSlice";
import type { AppDispatch } from "../../store/store";
export default function MultiStepSignup() {
  const step = useSelector((state: RootState) => state.signUpReducer.step);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleResetStep = () => {
    if (step === 3) {
      dispatch(prevStep(2));
    }
    if (step > 1) {
      dispatch(prevStep());
    } else {
      dispatch(resetSignup());
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back to Home Button */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <button
          onClick={handleResetStep}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">
            {step > 1 ? "Back" : "Back to Home"}
          </span>
        </button>
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
