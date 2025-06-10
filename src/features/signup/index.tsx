// features/signup/MultiStepSignup.js
import { useSelector } from 'react-redux';
import Step1MobileCheck from './Step1_MobileCheck';
import Step2OtpVerification from './Step2_OtpVerification';
import Step3ProfileForm from './Step3_ProfileForm';
import type { RootState } from '../../store/store';

export default function MultiStepSignup() {
  const step = useSelector((state: RootState) => state.signUpReducer.step);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {step === 1 && <Step1MobileCheck />}
      {step === 2 && <Step2OtpVerification />}
      {step === 3 && <Step3ProfileForm />}
    </div>
  );
}