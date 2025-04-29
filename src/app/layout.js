import "./globals.css";
import localFont from 'next/font/local'

export const metadata = {
  title: "cogni.study - An AI-powered learning platform",
  icons: {
    icon: "/logo/logo-favicon.svg",
    shortcut: "/logo/logo-favicon.svg",
    apple: "/logo/logo-favicon.svg",
  },
  description: "An AI-powered learning platform",
  author: {
    name: "Aaloke Eppalapalli",
    url: "https://aaloke.com",
  },
};

const overusedGrotesk = localFont({ src: '/fonts/overused-grotesk.ttf', display: 'swap', variable: '--font-overusedGrotesk' });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#131313] ${overusedGrotesk.className}`}
      >
        {children}
      </body>
    </html>
  );
}
