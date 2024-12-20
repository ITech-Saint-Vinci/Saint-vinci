import { queryClient } from "@/App";
import { getStored, removeStored, setStored } from "@/lib/utils";
import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const validateTokenAPI = async (token: string) => {
  const response = await fetch(
    "http://localhost:3001/api/auth/validate-token",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Token validation failed");
  }

  const json = await response.json();
  setStored("role", json.data.role);
  return json;
};

export const useAuth = <T,>(mutationFn?: MutationFunction<unknown, T>) => {
  const navigate = useNavigate();
  const role = getStored("role");
  const token = getStored("auth_token");

  useQuery({
    queryKey: ["token-validation", token],
    queryFn: () => (token ? validateTokenAPI(token) : new Error("No token")),
    enabled: !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    onError: () => {
      removeStored("role");
      removeStored("auth_token");
      queryClient.setQueryData(["auth"], null);
    },
  });

  const authMutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      const authData = data as { token: string; role: string };
      setStored("auth_token", authData.token);
      queryClient.setQueryData(["auth"], data);
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      navigate("/");
    },
    onError: (_error) => {
      removeStored("auth_token");
      removeStored("role");
      queryClient.setQueryData(["auth"], null);
    },
  });

  const signOut = () => {
    removeStored("role");
    removeStored("auth_token");
    queryClient.setQueryData(["auth"], null);
    queryClient.invalidateQueries();
  };

  if (!token) {
    removeStored("role");
  }

  return {
    mutate: authMutation.mutate,
    signOut,
    token,
    role,
    isLoading: authMutation.isLoading,
    error: authMutation.error,
    isAuthenticated: !!token,
  };
};
