import React from "react";
import { CustomizerContextProvider } from "./context/customizerContext";
import MyApp from "./app";
import "./global.css";
import { Analytics } from "@vercel/analytics/react";
import NextAuthProvider from "./components/providers/NextAuthProvider";


export const metadata = {
  title: "Spike Demo",
  description: "Spike kit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomizerContextProvider>
          <MyApp>
                        <NextAuthProvider>{children}</NextAuthProvider>
            <Analytics />
          </MyApp>
        </CustomizerContextProvider>
      </body>
    </html>
  );
}
