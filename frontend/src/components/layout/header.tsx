import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth"; 
import { Link } from "react-router";

export function Header() {
  const { isAuthenticated } = useAuth(); 

  return (
    <header className="border-b self-start">
      <div className="flex justify-between items-center">
        <div className="container flex h-16 items-center px-4">
          <img src="../../Saint-Ex.jpeg" className="w-12" alt="Logo"/>
          <h1 className="text-2xl font-bold m-2"><Link to="/">Saint Vinci</Link></h1>
        {isAuthenticated && ( 
          <Button className="bg-green-400 ml-auto">
            <Link to="/students">Liste</Link>
          </Button>
        )}
        </div>
        {!isAuthenticated && (
          <Button className="mr-8">
            <Link to="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>  
    </header>
  );
}
