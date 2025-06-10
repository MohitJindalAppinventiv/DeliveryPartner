import { useRoutes } from "react-router-dom";
import routes from "./AppRoutes";

const RouteRenderer=()=>{
    return useRoutes(routes);
}

export default RouteRenderer;