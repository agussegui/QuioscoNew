import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Raleway } from '@next/font/google'


const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: "Pan y Circo",
  description: "Pan y Circo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"  rel="stylesheet" />
      </head>
      <body className={`${raleway.className} bg-gray-100`}>
        {children}
      </body>
    </html>
  );
}
