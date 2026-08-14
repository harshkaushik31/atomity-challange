// src/app/layout.tsx
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Atomity — Cloud Cost Optimization",
  description: "Frontend challenge submission",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar/>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}