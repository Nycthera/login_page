"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { login } from "../app/server/Login";
import { createAccount } from "../app/server/CreateAccount";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "create">("login");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const result = await login({ email, password: passcode });
        if (result.success) {
          toast.success(`${email} logged in successfully!`);
          setTimeout(() => router.push("/dashboard"), 1000); // redirect after 1s
        } else {
          toast.error(result.error || "Login failed");
        }
      } else {
        const result = await createAccount({ email, password: passcode, name });
        if (result.success) {
          toast.success(`${email} created successfully!`);
          setTimeout(() => router.push("/dashboard"), 1000);
        } else {
          toast.error(result.error || "Account creation failed");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const genRandomString = (length: number) => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    setEmail(genRandomString(10) + "@gmail.com");
  }, []); // empty dependency → run only once on mount
  console.log(email);
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Toaster position="top-right" />
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-center">
            {mode === "login" ? "Login" : "Create Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            {mode === "create" && (
              <Input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Button type="submit" className="w-full">
              {mode === "login" ? "Login" : "Create Account"}
            </Button>
          </form>
          <p
            className="text-sm text-center mt-2 text-blue-500 cursor-pointer"
            onClick={() => setMode(mode === "login" ? "create" : "login")}
          >
            {mode === "login"
              ? "Don't have an account? Create one"
              : "Already have an account? Login"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
