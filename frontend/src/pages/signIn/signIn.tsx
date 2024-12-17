import { SignInForm, SignInFormValues } from "@/components/forms/sighnInForm";
import { useAuth } from "@/hooks/useAuth";

const signInFn = async ({
  username,
  password,
}: SignInFormValues): Promise<void> => {
  const response = await fetch("http://localhost:3001/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.toLowerCase(),
      password: password.toLowerCase(),
    }),
  });

  if (!response.ok) {
    throw new Error("Sign in failed. Please check your credentials.");
  }

  return response.json();
};

export const SignIn = () => {
  const { mutate, isLoading } = useAuth(signInFn);

  const onSubmit = async (values: SignInFormValues) => {
    mutate(values);
  };

  return (
    <div className="flex justify-center items-center flex-col p-48 space-y-8 w-screen h-screen">
      <div className="bg-white rounded-md w-2/4 h-full flex items-center flex-col p-8">
        <div className="text-3xl font-bold">Sign in</div>
        <SignInForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
