import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "TPM — Class 11 & 12 Physics, Chemistry, Maths" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><main>{children}</main></body>
    </html>
  );
}
