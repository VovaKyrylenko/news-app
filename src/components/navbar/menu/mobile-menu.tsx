"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "../logout";
import { Session } from "next-auth";
import { ModeToggle } from "../mode-toggle";

interface MobileMenuProps {
  session: Session | null;
}

export const MobileMenu = ({ session }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden w-full flex justify-end items-center relative z-20 ml-4">
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <Button
          onClick={toggleMenu}
          variant="ghost"
          size="icon"
          className="relative z-30"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-background p-4">
          <ul className="w-full space-y-4 text-center">
            <li className="w-full">
              <Link
                href="/"
                onClick={toggleMenu}
                className="block p-2 text-2xl"
              >
                Home
              </Link>
            </li>
            {session && (
              <li className="w-full">
                <Link
                  href="/dashboard"
                  onClick={toggleMenu}
                  className="block p-2 text-2xl"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="w-full">
              {session ? (
                <div className="text-2xl">
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={toggleMenu}
                  className="block p-2 text-2xl"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
