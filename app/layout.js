import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "This Day in History",
  description: "Discover historical events that happened on your special day",
  keywords: [
    "This Day in History",
    "historical events",
    "on this day",
    "events by date",
    "historical facts",
    "historical timeline",
    "historical events by date",
  ],
  authors: [
    {
      name: "Abhay Patel",
      url: "https://www.dayinhistory.vercel.app",
    },
  ],
  creator: "Abhay Patel",
  publisher: "Abhay Patel",
  themeColor: "#1e3a8a",
  colorScheme: "dark",
  openGraph: {
    title: "This Day in History",
    description: "Discover historical events that happened on your special day",
    url: "https://www.dayinhistory.vercel.app",
    siteName: "This Day in History",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Nehru%2C_Gandhi_and_Patel_AICC_1946.jpg/1280px-Nehru%2C_Gandhi_and_Patel_AICC_1946.jpg",
        width: 1200,
        height: 630,
        alt: "This Day in History",
      },
    ],
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
