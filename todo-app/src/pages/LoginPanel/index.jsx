import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from './userSlice';

function LoginPanel() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('xphong.fullstack03@gmail.com');
  const [submitting, setSubmitting] = useState(false);

  const loginTodoApp = async (email) => {
    setSubmitting(true);
    try {
      const action = login({ email });
      await dispatch(action);
    } catch (error) {
      throw new Error('Fail to fetch');
    } finally {
      setEmail('');
      setSubmitting(false);
    }
  };

  const handleChangeValue = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('Vui lòng nhập email');
    } else if (!submitting) {
      loginTodoApp(email);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-slate-700">
      <div className="rounded-xl bg-white px-5 py-4">
        <h1 className="mb-5 text-center text-2xl uppercase">Todo App</h1>
        <form onSubmit={handleSubmit} className="w-[400px]">
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <div className="mb-4 mt-2">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                autoFocus
                autoComplete="off"
                placeholder="Nhập email của bạn..."
                onChange={handleChangeValue}
                className="w-full rounded border border-solid border-gray-400 px-4 py-2 text-sm outline-none"
              />
            </div>
          </div>
          <button
            className={`w-full rounded px-4 py-2 text-white transition-colors hover:bg-blue-400 ${submitting ? 'cursor-not-allowed bg-blue-400' : 'cursor-pointer bg-blue-500'}`}
          >
            {submitting ? 'Đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPanel;
