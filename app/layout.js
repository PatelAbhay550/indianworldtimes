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
  title: "Indian World Times - Latest News Updates and Current Affairs",
  description: "Stay updated with the latest news and current affairs in India",
  authors: [
    {
      name: "Abhay Patel",
      url: "https://www.indianworldtimes.vercel.app",
    },
  ],
  creator: "Abhay Patel",
  publisher: "Abhay Patel",
  keywords: [
    "news",
    "current affairs",
    "latest news",
    "Indian news",
    "world news",
    "politics",
    "economy",
    "indian world times"
  ],
  authors: [
    {
      name: "Abhay Patel",
      url: "https://www.indianworldtimes.vercel.app",
    },
  ],
  
  themeColor: "#1e3a8a",
  colorScheme: "dark",
  openGraph: {
    title: "Indian World Times - Latest News Updates and Current Affairs",
    description: "Stay updated with the latest news and current affairs in India",
    url: "https://www.indianworldtimes.vercel.app",
    siteName: "Indian World Times",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Nehru%2C_Gandhi_and_Patel_AICC_1946.jpg/1280px-Nehru%2C_Gandhi_and_Patel_AICC_1946.jpg",
        width: 1200,
        height: 630,
        alt: "Indian World Times",
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
