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
      // Add other protected routes here
      
    ],
  },
  {
    path:"*",
    element:<NotFound/>
  }

];

export default routes;


// import Login            from "../pages/login/Login";
// import Dashboard        from "../pages/dashboard/Dashboard";
// import NotFound         from "../pages/not-found/NotFound";
// import Profile          from "../pages/profile/Profile";
// import SignUp           from "../pages/signup/SignUp";
// import DeliveryPartner  from "../pages/Landing/DeliveryPartner";

// import PublicRoute      from "../components/auth/PublicRoute";
// import ProtectedRoute   from "../components/auth/ProtectedRoute";

// const routes = [
//   // ───── PUBLIC ────────────────────────────────────────────────
//   {
//     path: "/",
//     element: (
//       <PublicRoute>
//         <DeliveryPartner />
//       </PublicRoute>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <PublicRoute>
//         <Login />
//       </PublicRoute>
//     ),
//   },
//   {
//     path: "/signup",
//     element: (
//       <PublicRoute>
//         <SignUp />
//       </PublicRoute>
//     ),
//   },

//   // ───── PRIVATE ───────────────────────────────────────────────
//   {
//     path: "/dashboard",
//     element: (
//       <ProtectedRoute>
//         <Dashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/profile",
//     element: (
//       <ProtectedRoute>
//         <Profile />
//       </ProtectedRoute>
//     ),
//   },

//   // ───── FALLBACK ──────────────────────────────────────────────
//   { path: "*", element: <NotFound /> },
// ];

// export default routes;
