"use client"; // Client component required to access localStorage
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserRedirect() {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      router.replace(`/user-${username}`); // redirect to dynamic path
    } else {
      router.replace("/login"); // or wherever you want if not logged in
    }
  }, [router]);

  return <p>Redirecting...</p>;
}
