import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BBCFeed - Stay Updated with the Latest News",
  description:
    "Get the latest news, updates, and insights from around the world on BBCFeed. Stay informed with breaking news, in-depth articles, and more.",
  keywords:
    "BBCFeed, news, latest news, breaking news, world news, updates, articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* @ts-expect-error Server Component */}
          <NavBar />
          <main>{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
