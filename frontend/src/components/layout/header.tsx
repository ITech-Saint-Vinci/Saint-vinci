import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Link } from "react-router";

export function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="border-b self-start">
      <div className="flex justify-between items-center">
        <div className="container flex h-16 items-center px-4">
          <img src="../../Saint-Ex.jpeg" className="w-12"></img>
          <h1 className="text-2xl font-bold m-2">Saint Vinci</h1>
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
