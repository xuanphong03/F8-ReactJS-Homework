import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingSpinner from "~/components/animations/LoadingSpinner";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Vui lòng nhập email");
    if (onSubmit) {
      setLoading(true);
      await onSubmit({ email });
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <Fragment>
      {loading && (
        <div className="fixed z-50 inset-0 bg-white bg-opacity-20 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-125 bg-white px-10 py-5 rounded-md"
      >
        <div>
          <label htmlFor="email">Email</label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              name="email"
              autoFocus
              value={email}
              onChange={handleChange}
              placeholder="example@gmail.com..."
              className="w-full border border-solid border-gray-500 rounded px-4 py-2 outline-none"
            />
          </div>
          <button className="mt-5 w-full rounded bg-blue-500 text-white py-2 px-5 cursor-pointer hover:bg-blue-400 transition-colors">
            Đăng nhập
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default LoginForm;
