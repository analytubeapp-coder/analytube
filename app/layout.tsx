import { Poppins } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/lib/SupabaseProvider";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "AnalyTube",
  description: "YouTube analytics made simple",
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
      <body className={`${poppins.variable} antialiased`}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>

        <Analytics />
      </body>
    </html>
  );
}