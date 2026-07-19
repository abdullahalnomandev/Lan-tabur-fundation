import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionaries";

export default function Header({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const otherLang = lang === "bn" ? "en" : "bn";
  const otherLabel = lang === "bn" ? "EN" : "বাং";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-[var(--parchment)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link
          href={`/${lang}`}
          className="font-heading text-xl font-medium tracking-tight text-green-900 md:text-2xl"
        >
          {dict.hero.name}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#courses" className="text-[15px] text-ink/80 transition hover:text-green-900">
            {dict.nav.courses}
          </a>
          <a href="#programs" className="text-[15px] text-ink/80 transition hover:text-green-900">
            {dict.nav.programs}
          </a>
          <a href="#structure" className="text-[15px] text-ink/80 transition hover:text-green-900">
            {dict.nav.structure}
          </a>
          <a href="#transparency" className="text-[15px] text-ink/80 transition hover:text-green-900">
            {dict.nav.transparency}
          </a>
          <a href="#contact" className="text-[15px] text-ink/80 transition hover:text-green-900">
            {dict.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${otherLang}`}
            className="rounded-full border border-[var(--hairline)] px-3 py-1.5 text-sm font-medium text-ink/70 transition hover:border-green-700 hover:text-green-900"
          >
            {otherLabel}
          </Link>
          <Link
            href={`/${lang}/courses`}
            className="rounded-full bg-green-900 px-4 py-2 text-sm font-medium text-gold-100 transition hover:bg-green-700"
          >
            {dict.nav.courses}
          </Link>
        </div>
      </div>
    </header>
  );
}
