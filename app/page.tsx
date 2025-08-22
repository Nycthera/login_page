"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Dashboard from "./dashboard/page"; // 👈 import dashboard

export default function Home() {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const correctUser = "admin";
  const correctPass = "1234";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === correctUser && passcode === correctPass) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("❌ Invalid username or passcode.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPasscode("");
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex items-center justify-center min-h-screen bg-background dark">
          <Card className="w-80">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Dashboard username={username} onLogout={handleLogout} />
      )}
    </>
  );
}
