"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export default function Dashboard({ username, onLogout }: DashboardProps) {
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");

  const addNewUser = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!newUser || !newPass) {
      setMessage("Username and passcode cannot be empty.");
      return;
    }

    if (users[newUser]) {
      setMessage("User already exists!");
      return;
    }

    users[newUser] = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage(`User "${newUser}" added successfully!`);
    setNewUser("");
    setNewPass("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-96 text-center">
        <CardHeader>
          <CardTitle>Welcome, {username}!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>You have successfully logged in.</p>

          {username === "admin" && (
            <div className="flex flex-col gap-2">
              <Input
                placeholder="New Username"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <Input
                placeholder="New Passcode"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <Button onClick={addNewUser}>Add New User</Button>
              {message && <p className="text-green-500 text-sm">{message}</p>}
            </div>
          )}

          <Button onClick={onLogout}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
}
