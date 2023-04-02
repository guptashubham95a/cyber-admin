import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import { auth } from "./firebase";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";

import ProductsPage from "./pages/ProductsPage";

// ----------------------------------------------------------------------

export default function Router({ user }) {
  const requireAuth = ({ children }) => {
    return user ? children : <Navigate to='/login' />;
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <LoginPage />,
      children: [
        {
          element: (
            <requireAuth>
              <DashboardAppPage />
            </requireAuth>
          ),
          index: true,
        },
        { element: <Navigate to='/login' /> },
        { path: "login", element: <LoginPage /> },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to='/dashboard/app' />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to='/dashboard/app' />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to='/404' /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to='/404' replace />,
    },
  ]);

  return routes;
}
