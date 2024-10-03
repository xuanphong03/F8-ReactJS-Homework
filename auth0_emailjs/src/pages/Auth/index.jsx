import { useAuth0 } from "@auth0/auth0-react";

/* eslint-disable react/no-unescaped-entities */
function Auth() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className="bg-red-500 text-white w-100 p-8 rounded-xl">
      <h1 className="text-3xl font-bold text-center">Welcome to F8</h1>
      <h2 className="text-lg text-center">Thank you for using F8's services</h2>
      <p className="mt-3 text-xl font-medium text-center">
        If you have any questions or help, log in and ask here!
      </p>
      <button
        onClick={handleLogin}
        className="block mx-auto mt-5 bg-white py-3 px-7 text-red-500 font-bold rounded-md hover:scale-90 transition-transform duration-300"
      >
        Login || Register
      </button>
    </div>
  );
}

export default Auth;
