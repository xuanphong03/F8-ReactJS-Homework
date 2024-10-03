import { useAuth0 } from "@auth0/auth0-react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./components/LoadingSpinner";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <main className="flex justify-center items-center min-h-screen">
          {isAuthenticated ? <Home /> : <Auth />}
          <ToastContainer autoClose={2000} closeOnClick={true} />
        </main>
      )}
    </Fragment>
  );
}

export default App;
