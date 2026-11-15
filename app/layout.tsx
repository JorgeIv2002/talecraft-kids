import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaleCraft Kids — Cuentos Infantiles Interactivos 'Elige Tu Aventura'",
  description:
    "Cuentos interactivos y educativos para niños de 4 a 10 años. Cada historia enseña valores positivos y permite al niño tomar decisiones en capítulos ilustrados con modo noche.",
  keywords: [
    "cuentos interactivos",
    "elige tu propia aventura para niños",
    "educación infantil",
    "valores para niños",
    "lectura infantil",
    "cuentos para dormir",
    "app infantil android",
  ],
  authors: [{ name: "TaleCraft Studios" }],
  creator: "TaleCraft Kids",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://talecraft-kids.vercel.app",
    title: "TaleCraft Kids — Cuentos Infantiles Interactivos",
    description:
      "Historias donde tu hijo es el héroe y aprende valores en cada decisión.",
    siteName: "TaleCraft Kids",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaleCraft Kids — Cuentos Infantiles Interactivos",
    description:
      "Historias donde tu hijo es el héroe y aprende valores en cada decisión.",
  },
  icons: {
    icon: "/icon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FF6B4A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${fredoka.variable} ${nunito.variable}`}>
      <body suppressHydrationWarning className="bg-[#FAF7F2] text-[#2C241D] min-h-screen antialiased selection:bg-[#FFE3B3] font-body">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var r of regs) { r.unregister(); }
                  });
                } else {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function() {});
                  });
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
