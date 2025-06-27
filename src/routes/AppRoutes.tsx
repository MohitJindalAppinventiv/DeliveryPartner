import { lazy, Suspense } from "react";

import PublicRoute from "../components/auth/PublicRoute";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CalendarComponent from "../pages/calendar/CalendarComponent";



const Review=lazy(()=>import("../pages/review/Review"));
// lazy loading
const Login = lazy(() => import("../pages/login/Login"));
// import Login from "../pages/login/Login";
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
// import Dashboard from "../pages/dashboard/Dashboard";
const NotFound = lazy(() => import("../pages/not-found/NotFound"));
// import NotFound from "../pages/not-found/NotFound";
const Profile = lazy(() => import("../pages/profile/Profile"));
// import Profile from "../pages/profile/Profile";
const SignUp = lazy(() => import("../pages/signup/SignUp"));
// import SignUp from "../pages/signup/SignUp";
const DeliveryPartner = lazy(() => import("../pages/Landing/DeliveryPartner"));
// import DeliveryPartner from "../pages/Landing/DeliveryPartner";
const EarningsPage = lazy(() => import("../pages/earning/Earning"));
// import EarningsPage from "../pages/earning/Earning";
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"));
// import DashboardLayout from "../layout/DashboardLayout";
const OrderHistory = lazy(() => import("../pages/order-history/OrderHistory"));
// import OrderHistory from "../pages/order-history/OrderHistory";
const Notification = lazy(() => import("../pages/notification/Notification"));
// import Notification from "../pages/notification/Notification";
const ForgotPasswordPage = lazy(
  () => import("../pages/forgot-password/ForgotPassword")
);
// import ForgotPasswordPage from "../pages/forgot-password/ForgotPassword";
const LoadingScreen = lazy(() => import("../components/common/LoadingScreen"));


const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <Suspense fallback={<LoadingScreen />}>
          <DeliveryPartner />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Suspense fallback={<LoadingScreen />}>
          <Login />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Suspense fallback={<LoadingScreen />}>
          <SignUp />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingScreen />}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "earnings",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <EarningsPage />
          </Suspense>
        ),
      },
      {
        path: "order-history",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <OrderHistory />
          </Suspense>
        ),
      },
      {
        path: "notifications",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <Notification />
          </Suspense>
      ),
      },
      {
        path:"reviews",
        element:(
          <Suspense fallback={<LoadingScreen/>}>
            <Review/>
          </Suspense>
        )
      },
      {
        path:"calendar",
        element:(
          <Suspense fallback={<LoadingScreen/>}>
            <CalendarComponent/>
          </Suspense>
        )
      }
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
