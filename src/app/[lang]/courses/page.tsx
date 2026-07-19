import Link from "next/link";
import { getDictionary, locales, asLocale } from "@/lib/dictionaries";
import { StarDivider } from "@/components/Ornament";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = getDictionary(lang);

  return (
    <>
      <section className="relative overflow-hidden bg-green-900 text-parchment py-16 md:py-24">
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
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-300/90">
            {dict.coursesSection.eyebrow}
          </p>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl">
            {dict.coursesSection.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {dict.coursesSection.items.map((course) => (
            <div
              key={course.slug}
              className="group relative overflow-hidden rounded-xl border border-[var(--hairline)] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gold-400/50"
            >
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-gold-200/30 to-transparent" />
              <div className="relative">
                <p className="text-xs font-medium text-gold-600">{course.duration} • {course.price}</p>
                <h3 className="mt-2 font-heading text-2xl text-green-950">{course.title}</h3>
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
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
