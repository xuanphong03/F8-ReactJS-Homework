import { useDispatch } from "react-redux";
import LoginForm from "./components/LoginForm";
import { login } from "./userSlice";
import { toast } from "react-toastify";

function AuthPage() {
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      const action = login(data);
      await dispatch(action);
    } catch (error) {
      toast.error("Email không chính xác. Vui lòng thử lại");
    }
  };

  return (
    <div className="bg-blue-400 fixed inset-0 flex justify-center items-center ">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default AuthPage;
