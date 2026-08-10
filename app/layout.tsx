import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "ScriptEdge | Academic Work Made Easy",
    template: "%s | ScriptEdge",
  },

  description:
    "ScriptEdge provides professional academic assistance for assignments, projects, practical files, presentations and other academic work for school, college and university students.",

  keywords: [
    "ScriptEdge",
    "academic work",
    "assignments",
    "projects",
    "practical files",
    "school assignments",
    "college assignments",
    "academic assistance",
  ],

  authors: [
    {
      name: "ScriptEdge",
    },
  ],

  creator: "ScriptEdge",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "ScriptEdge | Academic Work Made Easy",
    description:
      "Professional academic assistance for assignments, projects, practical files and more.",
    siteName: "ScriptEdge",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "ScriptEdge | Academic Work Made Easy",
    description:
      "Professional academic assistance for assignments, projects, practical files and more.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}