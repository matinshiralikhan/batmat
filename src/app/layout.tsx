import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import CommandPalette from "@/components/ui/CommandPalette";
import KonamiEgg from "@/components/ui/KonamiEgg";
import StatusWidget from "@/components/ui/StatusWidget";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BATMAT",
  description: "Built in the dark. Works in the light.",
  openGraph: {
    title: "BATMAT",
    description: "Built in the dark. Works in the light.",
    type: "website",
  },
};

/* Runs before React hydration — prevents flash of wrong theme / language.
   Sets CSS variables as inline styles on <html> so they win over all layers. */
const blockingScript = `(function(){try{
  var h=document.documentElement;
  var t=localStorage.getItem('batmat-theme')||'dark';
  var l=localStorage.getItem('batmat-lang')||'en';
  var dark={'--color-bat-black':'#0A0A0A','--color-bat-graphite':'#111111','--color-bat-dark':'#1A1A1A','--color-bat-concrete':'#2C2C2C','--color-bat-ash':'#555555','--color-bat-ghost':'#888888','--color-bat-white':'#F0F0EE','--color-bat-clinical':'#FAFAFA'};
  var light={'--color-bat-black':'#F0F0EE','--color-bat-graphite':'#E6E6E4','--color-bat-dark':'#DCDCDA','--color-bat-concrete':'#C4C4C2','--color-bat-ash':'#666666','--color-bat-ghost':'#999999','--color-bat-white':'#111111','--color-bat-clinical':'#0A0A0A'};
  var vars=t==='light'?light:dark;
  for(var k in vars)h.style.setProperty(k,vars[k]);
  if(t==='light')h.classList.add('light');
  h.setAttribute('lang',l);
  h.setAttribute('dir',l==='fa'?'rtl':'ltr');
  if(l==='fa'){h.classList.add('fa');h.style.setProperty('--font-body',"'IRANSansX','Tahoma',system-ui,sans-serif");h.style.setProperty('--font-display',"'IRANSansX',system-ui,sans-serif");h.style.setProperty('--font-mono',"'IRANSansX','Courier New',monospace");}
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${spaceMono.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: blockingScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScrollProvider>
              <CustomCursor />
              <Nav />
              {children}
              <CommandPalette />
              <KonamiEgg />
              <StatusWidget />
            </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
