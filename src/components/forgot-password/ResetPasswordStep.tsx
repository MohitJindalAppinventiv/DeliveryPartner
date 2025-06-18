// import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../..//hooks/useAppDispatch';
// import {
//   resetPassword,
//   selectForgot,
// } from '../../store/forgotPasswordSlice';

// export default function ResetPasswordStep() {
//   const dispatch = useAppDispatch();
//   const { accessToken, status, error } = useAppSelector(selectForgot);
//   const [form, setForm] = useState({ password: '', confirm: '' });

//   const onSubmit = () => {
//     if (form.password !== form.confirm) return alert("Passwords don't match");
//     const accessToken=localStorage.getItem('forget-token') || ""
//     dispatch(resetPassword({ password: form.password, accessToken}));
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Set New Password</h1>

//       <input
//         type="password"
//         placeholder="New password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         className="w-full rounded border px-3 py-2"
//       />
//       <input
//         type="password"
//         placeholder="Confirm new password"
//         value={form.confirm}
//         onChange={(e) => setForm({ ...form, confirm: e.target.value })}
//         className="w-full rounded border px-3 py-2"
//       />
//       <button
//         onClick={onSubmit}
//         disabled={status === 'loading'}
//         className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
//       >
//         {status === 'loading' ? 'Updating…' : 'Change Password'}
//       </button>

//       {error && <p className="text-sm text-red-600">{error}</p>}
//     </div>
//   );
// }


// ResetPasswordStep.tsx
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  resetPassword,
  selectForgot,
} from '../../store/forgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
export default function ResetPasswordStep() {
  const dispatch = useAppDispatch();
  const { accessToken, status, error } = useAppSelector(selectForgot);
  const [form, setForm] = useState({ password: '', confirm: '' });
  const navigate=useNavigate();

  const onSubmit = () => {
    if (form.password !== form.confirm) {
      return alert("Passwords don't match");
    }
    
    // Use accessToken from Redux state first, then fallback to localStorage
    const token = accessToken || localStorage.getItem('forget-access-token') || '';
    
    if (!token) {
      return alert('No access token found. Please restart the process.');
    }
    
    dispatch(resetPassword({ password: form.password, accessToken: token }));
    navigate('/login');
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
        className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
      >
        {status === 'loading' ? 'Updating…' : 'Change Password'}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

