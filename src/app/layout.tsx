import React from "react";
import { CustomizerContextProvider } from "./context/customizerContext";
import MyApp from "./app";
import "./global.css";
import { Analytics } from "@vercel/analytics/react";


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
            {children}
            <Analytics />
          </MyApp>
        </CustomizerContextProvider>
      </body>
    </html>
  );
}
