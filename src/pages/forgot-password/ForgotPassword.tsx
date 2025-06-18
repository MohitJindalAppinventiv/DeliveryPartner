import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectForgot } from "../../store/forgotPasswordSlice";
import EmailStep from "../../components/forgot-password/EmailStep";
import OtpStep from "../../components/forgot-password/OtpStep";
import ResetPasswordStep from "../../components/forgot-password/ResetPasswordStep";

export default function ForgotPasswordPage(){
    const { step } = useAppSelector(selectForgot);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded bg-white p-6 shadow">
            {step === 'email' && <EmailStep />}
            {step === 'otp' && <OtpStep />}
            {step === 'reset' && <ResetPasswordStep />}
          </div>
        </main>
      );
}