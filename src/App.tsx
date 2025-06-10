import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "./store/authSlice";
import RouteRenderer from "./routes/RouteRenderer";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(setCredentials(token));
    }
  });

  return (
    // <RouterProvider router={router}/>
    <RouteRenderer />
  );
}

export default App;
