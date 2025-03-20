import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Products from "../pages/Products";
import Services from "../pages/Services";
import Aboutus from "../pages/Aboutus";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./protectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/aboutus',
        element: <Aboutus />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute />,
        children: [{
          path: "",
          element: <Dashboard />
        }]
      }
    ],
  },
]);

export default router;
