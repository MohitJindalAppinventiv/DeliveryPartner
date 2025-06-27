import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "./store/slices/authSlice";
import RouteRenderer from "./routes/RouteRenderer";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(setCredentials(token));
    }
  });

  return (
    <>
      <RouteRenderer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />{" "}
    </>
  );
}

export default App;
