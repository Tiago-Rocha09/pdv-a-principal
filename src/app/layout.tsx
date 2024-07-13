import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import GlobalProvider from "@/providers";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDV A Principal",
  description: "PDV A Principal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
