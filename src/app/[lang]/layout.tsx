import type { Metadata } from "next";
import { getDictionary, locales, asLocale } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Self-hosted fonts (no runtime call to Google Fonts required)
import "@fontsource/hind-siliguri/300.css";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "@fontsource/tiro-bangla/400.css";
import "@fontsource/tiro-bangla/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.hero.name} | ${dict.meta.title}`,
    description: dict.meta.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body data-locale={lang} className="flex min-h-screen flex-col antialiased">
        <Header dict={dict} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
