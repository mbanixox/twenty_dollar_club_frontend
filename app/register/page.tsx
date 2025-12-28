import RegisterForm from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-white dark:bg-black-100 dark:text-white p-3 m-1 rounded-lg shadow-lg max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
