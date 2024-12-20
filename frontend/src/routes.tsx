import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/layout/protectedRoute";
import Root from "./pages/root/root";
import { SignIn } from "./pages/signIn/signIn";
import { MainLayout } from "./components/layout/mainLayout";
import CloseYear from "./pages/closeYear/closeYear";
import { UserRole } from "./contants";
import Teacher from "./pages/teacher/student";
import { StudentsPage } from "./pages/public/studentsPage";
import TeacherRoot from "./pages/dashboard/teacher";
import NotificationsPage from "./pages/notifications/notifications";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/ourStudents",
        element: <StudentsPage />,
      },
      {
        element: (
          <ProtectedRoute
            allowedRoles={[UserRole.Teacher, UserRole.Admin, UserRole.Director]}
          />
        ),
        children: [
          {
            path: "/students",
            element: <Teacher />,
          },
          {
            path: "/notifications",
            element: <NotificationsPage />,
          },
         
        ],
      },
      {
        element: (
          <ProtectedRoute
            allowedRoles={[UserRole.Admin, UserRole.Director]}
            redirection="/teacher"
          />
        ),
        children: [
          {
            path: "/",
            element: <Root />,
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={[UserRole.Teacher]} />,
        children: [
          {
            path: "/teacher",
            element: <TeacherRoot />,
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={[UserRole.Director]} />,
        children: [
          {
            path: "/closeYear",
            element: <CloseYear />,
          },
        ],
      },
    ],
  },
]);
