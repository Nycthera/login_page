"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export default function Dashboard({ username, onLogout }: DashboardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-96 text-center">
        <CardHeader>
          <CardTitle>Welcome, {username}!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>You have successfully logged in.</p>
          <Button onClick={onLogout}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
}
