import type { Dictionary } from "@/lib/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-green-950 text-parchment">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-xl text-gold-300">{dict.hero.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-parchment/70">
              {dict.hero.tagline}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold-300/80">
              {dict.contact.eyebrow}
            </p>
            <p className="mt-3 text-sm text-parchment/80">{dict.contact.chairmanName}</p>
            <p className="text-sm text-parchment/60">{dict.contact.chairmanRole}</p>
            <p className="mt-2 text-sm text-parchment/80">
              {dict.contact.mobileLabel}: {dict.contact.mobileValue}
            </p>
            <p className="text-sm text-parchment/80">{dict.contact.addressValue}</p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm italic text-parchment/60">{dict.footer.verseFooter}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-parchment/50">
          © {year} {dict.hero.name}. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
