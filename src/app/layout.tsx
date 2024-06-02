import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import Providers from "./(context)/providers";

export const metadata = {
  title: "UnstudioAI",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}