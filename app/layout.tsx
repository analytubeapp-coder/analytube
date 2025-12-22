import { Archivo } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/lib/SupabaseProvider";
import { Analytics } from "@vercel/analytics/react";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // وزن‌های لازم
  variable: "--font-archivo",
});

export const metadata = {
  title: "mm",
  description: "lll",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>

        <Analytics />
      </body>
    </html>
  );
}