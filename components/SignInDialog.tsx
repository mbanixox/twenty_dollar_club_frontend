"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithCredentials } from "@/lib/auth/actions";
import Link from "next/link";

const SignInDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithCredentials(email, password);
      if (result) router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Sign in</DialogTitle>
          <DialogDescription className="text-center">
            Sign in with credentials
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="mt-4 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-base">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 mt-3">
            <Label htmlFor="password" className="text-base">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right">
              <Button
                variant="link"
                className="p-0 h-auto text-xs text-black-300"
              >
                Forgot password?
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 dark:bg-gray-400 hover:dark:bg-gray-500 hover:bg-gray-400"
          >
            {isLoading ? "Signing in..." : "Sign in with Email"}
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center p-2">{error}</div>
        )}

        <div className="mt-4 text-sm text-center">
          Don&apos;t have an account?
          <Link href="/register">
            <Button
              variant="link"
              className="p-0 pl-3 h-auto"
            >
              Become a Member
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
