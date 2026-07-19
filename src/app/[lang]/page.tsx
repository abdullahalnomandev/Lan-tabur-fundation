import Link from "next/link";
import { getDictionary, locales, asLocale } from "@/lib/dictionaries";
import { CornerOrnament, StarDivider } from "@/components/Ornament";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = getDictionary(lang);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-green-950 text-parchment">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--gold-300) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>
        <CornerOrnament className="absolute left-5 top-5 h-14 w-14 text-gold-300/70 md:left-10 md:top-8" />
        <CornerOrnament className="absolute right-5 top-5 h-14 w-14 rotate-90 text-gold-300/70 md:right-10 md:top-8" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <p className="reveal text-xs uppercase tracking-[0.28em] text-gold-300/90 md:text-sm">
            {dict.hero.eyebrow}
          </p>

          <div
            className="reveal mx-auto mt-8 max-w-2xl rounded-sm border border-gold-300/25 bg-white/[0.03] px-6 py-7"
            style={{ animationDelay: "80ms" }}
          >
            <p
              dir="rtl"
              lang="ar"
              className="font-heading text-xl leading-loose text-gold-100 md:text-2xl"
            >
              {dict.hero.verseArabic}
            </p>
            <p className="mt-3 text-xs tracking-widest text-gold-300/70">
              {dict.hero.verseRef}
            </p>
          </div>

          <h1
            className="reveal mt-10 font-heading text-4xl font-medium leading-tight text-parchment md:text-6xl"
            style={{ animationDelay: "150ms" }}
          >
            {dict.hero.name}
          </h1>
          <p
            className="reveal mt-4 font-heading text-xl italic text-gold-200/90 md:text-2xl"
            style={{ animationDelay: "220ms" }}
          >
            {dict.hero.tagline}
          </p>
          <p
            className="reveal mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-parchment/75 md:text-base"
            style={{ animationDelay: "280ms" }}
          >
            {dict.hero.intro}
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "340ms" }}
          >
            <Link
              href={`/${lang}/enroll`}
              className="rounded-full bg-gold-600 px-7 py-3 text-sm font-semibold text-green-950 transition hover:bg-gold-300"
            >
              {dict.hero.ctaEnroll}
            </Link>
            <a
              href="#programs"
              className="rounded-full border border-parchment/25 px-7 py-3 text-sm font-medium text-parchment/90 transition hover:border-gold-300 hover:text-gold-200"
            >
              {dict.hero.ctaPrograms}
            </a>
          </div>
        </div>
      </section>

      {/* COURSES — attractive course cards */}
      <section id="courses" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-700">
            {dict.coursesSection.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-green-950 md:text-4xl">
            {dict.coursesSection.title}
          </h2>
          <div className="mx-auto mt-5 h-4 w-28 text-gold-600">
            <StarDivider className="h-full w-full" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {dict.coursesSection.items.map((course) => (
            <div
              key={course.slug}
              className="group relative overflow-hidden rounded-xl border border-[var(--hairline)] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gold-400/50"
            >
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-gold-200/30 to-transparent" />
              <div className="relative">
                <p className="text-xs font-medium text-gold-600">
                  {course.duration} • {course.price}
                </p>
                <h3 className="mt-2 font-heading text-2xl text-green-950">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-ink/60">{course.subtitle}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
                  {course.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {course.features.map((feature, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${lang}/courses/${course.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-900 px-5 py-2.5 text-sm font-medium text-gold-100 transition hover:bg-green-700 group-hover:bg-gold-600 group-hover:text-green-950"
                >
                  {dict.coursePage.enrollNow}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS — numbered ledger, since these are the five enumerated pillars from the founding charter */}
      <section id="programs" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-700">
            {dict.programsSection.eyebrow}
          </p>

          <h2 className="mt-3 font-heading text-3xl text-green-950 md:text-5xl">
            {dict.programsSection.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/70 md:text-base">
            আমাদের পাঠ্যক্রম ধাপে ধাপে সাজানো হয়েছে, যাতে শিক্ষার্থীরা সহজে
            বিষয়গুলো বুঝতে এবং বাস্তব জীবনে প্রয়োগ করতে পারে।
          </p>

          <StarDivider className="mx-auto mt-6 h-4 w-32 text-gold-600" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {dict.programsSection.items.map((item) => (
            <div
              key={item.num}
              className="group rounded-3xl border border-[var(--hairline)] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900 font-heading text-lg text-gold-100">
                  {item.num}
                </span>

                <h3 className="font-heading text-xl text-green-950 md:text-2xl">
                  {item.title}
                </h3>
              </div>

              <p className="mt-5 leading-7 text-ink/75">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STRUCTURE */}
      <section
        id="structure"
        className="bg-green-900 py-20 text-parchment md:py-28"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-300/90">
              {dict.structureSection.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl text-parchment md:text-4xl">
              {dict.structureSection.title}
            </h2>
            <StarDivider className="mx-auto mt-5 h-4 w-28 text-gold-300" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dict.structureSection.items.map((item, i) => (
              <div
                key={item.title}
                className="rounded-sm border border-white/10 bg-white/[0.04] p-7 transition hover:border-gold-300/40"
              >
                <span className="font-heading text-sm text-gold-300/70">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-heading text-xl text-gold-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-parchment/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY — styled as an open ledger page */}
      <section
        id="transparency"
        className="mx-auto max-w-4xl px-6 py-20 md:py-28"
      >
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-700">
            {dict.transparencySection.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-green-950 md:text-4xl">
            {dict.transparencySection.title}
          </h2>
          <StarDivider className="mx-auto mt-5 h-4 w-28 text-gold-600" />
        </div>

        <div className="relative rounded-sm border border-[var(--hairline)] bg-[var(--parchment-deep)]/60 p-8 shadow-sm md:p-10">
          <CornerOrnament className="absolute -left-1 -top-1 h-10 w-10 text-gold-600/50" />
          <ul className="space-y-5">
            {dict.transparencySection.items.map((line, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-600" />
                <p className="text-[15px] leading-relaxed text-ink/80 md:text-base">
                  {line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-sm border border-[var(--hairline)] bg-white/50 p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-700">
            {dict.contact.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-2xl text-green-950 md:text-3xl">
            {dict.contact.title}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/50">
                {dict.contact.chairmanLabel}
              </p>
              <p className="mt-1 font-heading text-lg text-green-950">
                {dict.contact.chairmanName}
              </p>
              <p className="text-sm text-ink/70">{dict.contact.chairmanRole}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/50">
                {dict.contact.mobileLabel}
              </p>
              <p className="mt-1 text-lg text-green-950">
                {dict.contact.mobileValue}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-ink/50">
                {dict.contact.addressLabel}
              </p>
              <p className="text-sm text-ink/70">{dict.contact.addressValue}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
