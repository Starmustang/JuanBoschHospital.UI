import React from "react";
import { CustomizerContextProvider } from "./context/customizerContext";
import MyApp from "./app";
import "./global.css";



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
          <MyApp>{children}</MyApp>
        </CustomizerContextProvider>
      </body>
    </html>
  );
}
