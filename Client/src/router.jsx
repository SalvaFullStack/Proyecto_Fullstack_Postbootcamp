import {
  createBrowserRouter,
  RouterProvider as RouterProviderRRD,
  Navigate,
} from "react-router-dom";

import RootLayout from "layouts/RootLayout";
import ErrorPage from "pages/ErrorPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreateMatchdayPage from "./pages/CreateMatchDayPage";
import MatchDayPage from "./pages/MatchDayPage";
import TeamListPage from "./pages/TeamListPage";
import ProfilePage from "./pages/ProfilePage";
import AddPlayersPage from "./pages/AddPlayersPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import TeamDetailPage from "./pages/TeamDetailPage";
import ResultMatchdayPage from "./pages/ResultMatchdayPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace={true} />,
      },
      {
        path: "/matchdaycreate",
        element: <ProtectedRoute page={CreateMatchdayPage} role="admin" />,
      },
      {
        path: "/matchday",
        element: <ProtectedRoute page={MatchDayPage} role="auth" />,
      },
      {
        path: "/matchday/:matchdayId",
        element: <ProtectedRoute page={MatchDayPage} role="auth" />,
      },
      {
        path: "/matchdayresult",
        element: <ProtectedRoute page={ResultMatchdayPage} role="admin" />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute page={DashboardAdmin} role="admin" />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute page={ProfilePage} role="auth" />,
      },

      {
        path: "/team/addplayer",
        element: <ProtectedRoute page={AddPlayersPage} role="admin" />,
      },
      {
        path: "/team/:teamId",
        element: <ProtectedRoute page={TeamDetailPage} role="admin" />,
      },
      {
        path: "/team/list",
        element: <ProtectedRoute page={TeamListPage} role="admin" />,
      },
      {
        path: "/login",
        element: <ProtectedRoute page={LoginPage} role="anonymous" />,
      },
      {
        path: "/register",
        element: <ProtectedRoute page={RegisterPage} role="anonymous" />,
      },
      {
        path: "/logout",
        element: <ProtectedRoute page={LogoutPage} role="auth" />,
      },
    ],
  },
]);

const RouterProvider = ({ children }) => <RouterProviderRRD router={router} />;

export default RouterProvider;
