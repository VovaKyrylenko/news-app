"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Loader } from "lucide-react";

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="w-full md:w-auto"
      disabled={isLoading}
    >
      {isLoading ? <Loader className="animate-spin h-4 w-4" /> : "Sign Out"}
    </Button>
  );
};
