import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import TodoApp from './pages/TodoApp';
import LoginPanel from './pages/LoginPanel';
import { useEffect } from 'react';
import { StorageKeys } from './constant/storage-key';

function App() {
  const user = useSelector((state) => state.user.data);
  const isAuthenticated = !!user.email;

  useEffect(() => {
    if (isAuthenticated) {
      const { email } = JSON.parse(sessionStorage.getItem(StorageKeys.USER));
      toast.success(`Chào mừng bạn quay trở lại ${email.split('@')[0]}`);
    }
  }, [isAuthenticated]);

  return (
    <div className="font-poppins">
      {!isAuthenticated ? <LoginPanel /> : <TodoApp />}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
