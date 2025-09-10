"use client";

import { use, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logout } from "../server/Logout";
import Link from "next/link";
import { get } from "http";
import { account } from "../backend/appwrite.config";
interface DashboardProps {
  username: string;
}

export default function Dashboard({ username }: DashboardProps) {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const response = await account.get();
      if (response) {
        setUser(response);
      }
      console.log(response);
    } catch (error) {
      setError("Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-background light">
      <Card className="w-96 text-center">
        <CardHeader>
          <CardTitle>Welcome, {username}!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>You have successfully logged in.</p>
          <Button onClick={logout}>Logout</Button>

          {/* Use asChild so the Button acts as the Link */}
          <Button asChild>
            <Link href={`/user-${username}`}>Go to Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
