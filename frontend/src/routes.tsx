import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/layout/protectedRoute";
import Root from "./pages/root/root";
import { SignIn } from "./pages/signIn/signIn";
import { MainLayout } from "./components/layout/mainLayout";
import CloseYear from "./pages/closeYear/closeYear";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Root />,
          },
          {
            path: "/closeYear",
            element: <CloseYear />,
          },
        ],
      },
    ],
  },
]);
