import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/slices/authSlice";
import { REQUEST_STATUS } from "../../constants/request-status";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: loginRequestStatus } = useSelector((state) => state.auth);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginRequestStatus === REQUEST_STATUS.PENDING) return;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await dispatch(login(form));
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      throw new Error("Failed to login");
    }
  };

  return (
    <div className="h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-white w-75 px-3 py-2 rounded">
        <h1 className="mb-3 font-medium">Đăng nhập tài khoản</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <div className="border border-solid border-gray-300 rounded overflow-hidden">
            <input
              value={form.email ?? ""}
              onChange={handleChange}
              name="email"
              className="w-full outline-none bg-white px-2 py-1"
              placeholder="Nhập email..."
            />
          </div>
          <button
            type="submit"
            className={`text-white w-full px-5 py-1 rounded ${
              loginRequestStatus === REQUEST_STATUS.PENDING
                ? "cursor-not-allowed bg-blue-300"
                : "bg-blue-500 hover:bg-opacity-80 cursor-pointer"
            }`}
          >
            {loginRequestStatus === REQUEST_STATUS.PENDING
              ? "Đang xử lý..."
              : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
