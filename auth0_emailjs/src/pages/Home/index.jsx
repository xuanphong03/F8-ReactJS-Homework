import { createContext, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import emailjs from "@emailjs/browser";
import SendEmailForm from "./SendEmailForm";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

export const HomeContext = createContext();

function Home() {
  const emailjsServiceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
  const emailjsTemplateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_APP_EMAILJS_USER_ID;

  const { logout, user } = useAuth0();

  const [form, setForm] = useState({
    name: user.name,
    email: user.email || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogout = () => {
    logout();
  };

  const handleSubmitForm = async () => {
    try {
      setIsLoading(true);
      await emailjs.sendForm(
        emailjsServiceId,
        emailjsTemplateId,
        formRef.current,
        {
          publicKey: emailjsPublicKey,
        }
      );
      toast.success("Gửi email thành công");
    } catch (error) {
      toast.error("Gửi email thất bại");
      throw new Error("FAILED");
    } finally {
      setForm({ ...form, message: "" });
      setIsLoading(false);
    }
  };

  return (
    <HomeContext.Provider
      value={{ form, formRef, handleChangeForm, handleSubmitForm }}
    >
      {isLoading && <LoadingSpinner />}
      <div className="p-5 rounded border border-solid border-black">
        <div className="p-5 rounded border border-solid border-black">
          <div className="size-24 rounded-full overflow-hidden">
            <img
              src={user.picture}
              alt="avatar"
              className="max-w-full object-cover"
            />
          </div>
          <h1>Have a nice day {user.name}</h1>
          <h2>Email: {user.email}</h2>
          <div className="mt-5">
            <SendEmailForm />
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full h-11 bg-slate-600 text-white font-bold text-center rounded-full mt-5 hover:opacity-80"
        >
          Logout
        </button>
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
