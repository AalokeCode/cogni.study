import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#131313]`}
      >
        {children}
      </body>
    </html>
  );
}
