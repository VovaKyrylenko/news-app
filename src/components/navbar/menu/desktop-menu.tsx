import Link from "next/link";
import { Session } from "next-auth";
import { LogoutButton } from "../logout";
import { Button } from "../../ui/button";
import { ModeToggle } from "../mode-toggle";

interface DesktopMenuProps {
  session: Session | null;
}

export const DesktopMenu = ({ session }: DesktopMenuProps) => {
  return (
    <nav className="hidden md:flex items-center justify-between h-16 w-full ml-10">
      <div className="flex items-center space-x-6">
        <Button variant="link">
          <Link href="/" passHref>
            Home
          </Link>
        </Button>
        {session && (
          <Button variant="link">
            <Link href="/dashboard" passHref>
              Dashboard
            </Link>
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        {session ? (
          <LogoutButton />
        ) : (
          <Button asChild variant="default">
            <Link href="/auth/signin" passHref>
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};
