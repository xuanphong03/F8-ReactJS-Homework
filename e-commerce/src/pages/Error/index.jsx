import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="absolute inset-0">
      <img
        className="w-full h-full object-cover"
        src="https://media.geeksforgeeks.org/wp-content/uploads/20240222164806/Screenshot-2024-02-22-164753.png"
        alt="error page"
      />
      <button
        onClick={handleBackHome}
        className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-red-500 text-white rounded px-5 py-2 text-2xl hover:opacity-80"
      >
        Quay về trang chủ
      </button>
    </div>
  );
}

export default ErrorPage;
