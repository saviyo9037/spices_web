import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const scriptFont = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata = {
  title: { default: "Idukki Spices — Nature's Best Spices", template: "%s | Idukki Spices" },
  description:
    "Discover premium quality spices sourced from nature, carefully processed to preserve their natural aroma, flavor, and health benefits.",
  keywords: [
    "Spices",
    "Kerala spices",
    "Turmeric powder",
    "Black pepper",
    "Cardamom",
    "Cinnamon sticks",
    "Red chilli powder",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${scriptFont.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#faf7f2] text-[#1c1c1c] font-sans antialiased selection:bg-[#dfa84a] selection:text-[#143627]">
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
