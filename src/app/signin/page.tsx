import { SignInForm } from "@/components/sign-in-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <SignInForm />
      </Card>
    </div>
  );
};

export default LoginPage;
