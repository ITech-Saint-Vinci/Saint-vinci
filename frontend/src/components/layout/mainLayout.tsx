import { Outlet } from "react-router";
import { Header } from "./header";

export const MainLayout = () => (
  <>
    <div className="bg-[#185759] h-full">
      <Header />
      <Outlet />
    </div>
  </>
);
