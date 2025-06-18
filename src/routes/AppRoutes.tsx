import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/not-found/NotFound";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/signup/SignUp";
import DeliveryPartner from "../pages/Landing/DeliveryPartner";

import PublicRoute from "../components/auth/PublicRoute";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import EarningsPage from "../pages/earning/Earning";
import DashboardLayout from "../layout/DashboardLayout";
import OrderHistory from "../pages/order-history/OrderHistory";
import Notification from "../pages/notification/Notification";
import ForgotPasswordPage from "../pages/forgot-password/ForgotPassword";

const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <DeliveryPartner />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path:'/forgot-password',
    element:<ForgotPasswordPage/>
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "earnings",
        element: <EarningsPage />,
      },
      {
        path:"order-history",
        element:<OrderHistory/>
      },
      {
        path:'notifications',
        element:<Notification/>
      }      
    ],
  },
  {
    path:"*",
    element:<NotFound/>
  }

];

export default routes;
