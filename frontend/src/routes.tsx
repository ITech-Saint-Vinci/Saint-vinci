import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./pages/protectedRoute";
import { Root } from "./pages/root/root";
import { SignIn } from "./pages/signIn/signIn";
import { MainLayout } from "./components/layout/mainLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      //   {
      //     path: "/sign-up",
      //     element: <SignUp />,
      //   },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Root />,
          },
        ],
      },
    ],
  },
]);
