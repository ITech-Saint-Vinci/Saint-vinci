import { Outlet } from "react-router";
import { Header } from "./header";

export const MainLayout = () => (
  <>
    <Header />
    <div className="bg-[#185759]">
      <Outlet />
    </div>
  </>
);
