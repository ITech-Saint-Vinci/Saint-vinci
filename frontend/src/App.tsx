import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/toaster";

export const queryClient = new QueryClient();

function App() {
  return (
    <div className="h-screen">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
