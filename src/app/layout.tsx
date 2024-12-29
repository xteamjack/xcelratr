import type { Metadata } from "next";
import { Urbanist, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import QueryProvider from "@/context/query-provider";
import { Toaster } from "@/components/ui/toaster";

const urbanist = Urbanist({ subsets: ["latin"] });

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: "Xcelratr",
  description: "xCelratr - A Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="favicon.svg"
        sizes="any"
        type="image/svg+xml"
      ></link>
      <body
        className={cn("bg-background", open_sans.variable, urbanist.className)}
      >
        <QueryProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          {children}
          <Toaster />
          {/* </ThemeProvider> */}
        </QueryProvider>
      </body>
    </html>
  );
}
