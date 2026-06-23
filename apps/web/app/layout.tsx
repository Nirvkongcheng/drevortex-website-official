import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import "./legacy-common.css";
import "./legacy-home.css";
import "./legacy-about.css";
import "./legacy-services.css";
import "./legacy-cases.css";
import "./legacy-contact.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Drevortex 梦启新创",
    template: "%s | Drevortex 梦启新创",
  },
  description: "Drevortex 梦启新创企业级官网重建项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} h-full antialiased`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
