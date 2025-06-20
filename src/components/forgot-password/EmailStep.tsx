import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { requestOtp, selectForgot } from '../../store/forgotPasswordSlice';
import { useState } from 'react';

export default function EmailStep() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectForgot);
  const [email, setEmail] = useState('');

  const submit = () => {
    if (!email) return;
    dispatch(requestOtp(email));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">Forgot Password</h2>
        <p className="text-sm text-gray-600 mt-1">Enter your registered email</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        <button
          onClick={submit}
          disabled={status === 'loading'}
          className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send OTP'}
        </button>
      </div>
    </div>
  );
}
