import Link from "next/link";
import { MobileMenu } from "./menu/mobile-menu";
import { DesktopMenu } from "./menu/desktop-menu";
import { auth } from "@/auth";
import { Container } from "../container";

export const NavBar = async () => {
  const session = await auth();

  return (
    <nav>
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            BBCFeed
          </Link>
          <div className="flex items-center w-full">
            <DesktopMenu session={session} />
            <MobileMenu session={session} />
          </div>
        </div>
      </Container>
    </nav>
  );
};
