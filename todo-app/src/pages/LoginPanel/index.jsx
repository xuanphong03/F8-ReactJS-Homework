import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from './userSlice';
import LoadingSpinner from '~/components/LoadingSpinner';

function LoginPanel() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginTodoApp = async (email) => {
    setIsLoading(true);
    try {
      const action = login({ email });
      await dispatch(action);
    } catch (error) {
      throw new Error('Fail to fetch');
    } finally {
      setEmail('');
      setIsLoading(false);
    }
  };

  const handleChangeValue = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('Vui lòng nhập email');
    }
    loginTodoApp(email);
  };
  return (
    <Fragment>
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-gray-700 bg-opacity-20"></div>
          <LoadingSpinner />
        </div>
      )}
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
            <button className="w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginPanel;
