import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="border-b self-start flex items-center w-full">
      <div className=" flex h-16 items-center justify-between px-4 w-11/12">
        <div className="flex items-center justify-center gap-5">
          <img src="../../Saint-Ex.jpeg" className="w-12"></img>
          <h1 className="text-2xl font-bold m-2">Saint Vinci</h1>
          <Link to="/">Accueil</Link>
        </div>
        <Bell onClick={()=>navigate("/notifications")}/> 
        </div>
      </header>
  );
}