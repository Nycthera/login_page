"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Initialize default admin user
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (!users["admin"]) {
      users["admin"] = "1234";
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username] && users[username] === passcode) {
      setIsLoggedIn(true);
      setError("");
      localStorage.setItem("username", username);
    } else {
      setError("Invalid username or passcode.");
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
