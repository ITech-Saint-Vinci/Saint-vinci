import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router";

const getStoredToken = () => localStorage.getItem("auth_token");
const setStoredToken = (token: string) =>
  localStorage.setItem("auth_token", token);
const removeStoredToken = () => localStorage.removeItem("auth_token");

const validateTokenAPI = async (token: string) => {
  try {
    const response = await fetch("/api/validate-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Token validation failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const useAuth = <T,>(mutationFn?: MutationFunction<unknown, T>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = getStoredToken();

  const tokenValidationQuery = useQuery({
    queryKey: ["token-validation", token],
    queryFn: () =>
      token ? validateTokenAPI(token) : Promise.reject("No token"),
    enabled: !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const authMutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      setStoredToken(data.token);
      queryClient.setQueryData(["auth"], data);
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      navigate("/");
    },
    onError: (_error) => {
      removeStoredToken();
      queryClient.setQueryData(["auth"], null);
    },
  });

  const signOut = () => {
    removeStoredToken();
    queryClient.setQueryData(["auth"], null);
    queryClient.invalidateQueries();
  };

  return {
    mutate: authMutation.mutate,
    signOut,
    token,
    isLoading: authMutation.isPending,
    error: authMutation.error,
    isAuthenticated: token && tokenValidationQuery.isSuccess,
  };
};
