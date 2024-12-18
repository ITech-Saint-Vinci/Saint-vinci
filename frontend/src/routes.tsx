import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/layout/protectedRoute";
import Root from "./pages/root/root";
import { SignIn } from "./pages/signIn/signIn";
import { MainLayout } from "./components/layout/mainLayout";
import { InscriptionForm } from "./components/forms/inscriptionForm";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/popup",
        element: <InscriptionForm onSubmit={() => {}}/>,
      },
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
