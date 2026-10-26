import type { Metadata } from "next";
import { Inter, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai42e.com"),
  title: "AI42E — AI cho mọi người, cho mọi việc",
  description:
    "AI42E là nền tảng giúp nhiều người tiếp cận AI dễ dàng, với nhiều sản phẩm trong cùng một hệ sinh thái. Bắt đầu miễn phí, nâng cao khi bạn cần.",
  openGraph: {
    title: "AI42E — AI for everyone and everything",
    description: "Nền tảng AI cho mọi người: nhiều sản phẩm, bắt đầu miễn phí.",
    url: "https://ai42e.com",
    siteName: "AI42E",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" spellCheck={false}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

