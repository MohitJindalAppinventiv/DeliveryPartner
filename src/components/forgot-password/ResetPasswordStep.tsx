import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  clearState,
  resetPassword,
  selectForgot,
} from '../../store/slices/forgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
import { ToastError, ToastSuccess } from '../../utils/toast';
import { Bounce, ToastContainer } from 'react-toastify';

export default function ResetPasswordStep() {
  const dispatch = useAppDispatch();
  const { accessToken, status, error } = useAppSelector(selectForgot);
  const [form, setForm] = useState({ password: '', confirm: '' });
  const navigate=useNavigate();

  const onSubmit = async() => {
    if (form.password !== form.confirm) {
      ToastError("Password do not match");
      return;
    }
    
    const token = accessToken || localStorage.getItem('forget-access-token') || '';
    
    if (!token) {
      ToastError("Please Try Again");
      return;
      // return alert('No access token found. Please restart the process.');
    }
    try {
      
      await dispatch(resetPassword({ password: form.password, accessToken: token }));
      ToastSuccess("Password successfully Reset")
      setTimeout(()=>{
        navigate('/login');
      },2000)
      dispatch(clearState());
    } catch (error) {
      ToastError("Something wents Wrong! Please try again")
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Set New Password</h1>

      <input
        type="password"
        placeholder="New password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        className="w-full rounded border px-3 py-2"
      />
      <button
        onClick={onSubmit}
        disabled={status === 'loading' || !form.password || !form.confirm}
        className="w-full rounded bg-orange-600 py-2 text-white disabled:opacity-50"
      >
        {status === 'loading' ? 'Updating…' : 'Change Password'}
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

