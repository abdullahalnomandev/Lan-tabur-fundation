import Link from "next/link";
import { getDictionary, locales, asLocale } from "@/lib/dictionaries";
import { CornerOrnament, StarDivider } from "@/components/Ornament";

export function generateStaticParams() {
  const courses = ["seerah", "sitaat"];
  return locales.flatMap((lang) =>
    courses.map((slug) => ({ lang, slug }))
  );
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = asLocale(rawLang);
  const dict = getDictionary(lang);

  const course = dict.coursesSection.items.find((c) => c.slug === slug);

  if (!course) {
    return <div className="p-10 text-center">Course not found</div>;
  }

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
          <h1 className="mt-4 font-heading text-4xl md:text-5xl">{course.title}</h1>
          <p className="mt-3 text-lg text-gold-200/90">{course.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="font-heading text-2xl text-green-950">{dict.coursePage.details}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                {course.description}
              </p>
            </div>

            {course.whatYouWillLearn && (
              <div>
                <h2 className="font-heading text-2xl text-green-950">{dict.coursePage.whatYouWillLearn}</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {course.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-[var(--hairline)] bg-white p-4">
                      <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-ink/75">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.curriculum && (
              <div>
                <h2 className="font-heading text-2xl text-green-950">{dict.coursePage.curriculum}</h2>
                <div className="mt-6 space-y-4">
                  {course.curriculum.map((week, i) => (
                    <div key={i} className="rounded-xl border border-[var(--hairline)] bg-white p-5">
                      <h3 className="font-heading text-lg text-green-900">{week.week}</h3>
                      <ul className="mt-3 space-y-2">
                        {week.topics.map((topic, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-ink/70">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.whyTakeThisCourse && (
              <div>
                <h2 className="font-heading text-2xl text-green-950">{dict.coursePage.whyTakeThisCourse}</h2>
                <div className="mt-6 space-y-4">
                  {course.whyTakeThisCourse.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-[var(--hairline)] bg-white p-5">
                      <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-[15px] leading-relaxed text-ink/75">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-heading text-lg text-green-950">{dict.coursePage.features}</h3>
              <ul className="mt-4 space-y-2">
                {course.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink/75">
                    <div className="h-2 w-2 rounded-full bg-gold-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 rounded-xl border border-[var(--hairline)] bg-white p-7 shadow-sm">
              <h3 className="font-heading text-xl text-green-950">কোর্স তথ্য</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--hairline)] pb-3">
                  <span className="text-sm text-ink/60">{dict.coursePage.duration}</span>
                  <span className="font-medium text-green-900">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[var(--hairline)] pb-3">
                  <span className="text-sm text-ink/60">{dict.coursePage.price}</span>
                  <span className="text-2xl font-heading text-gold-600">{course.price}</span>
                </div>
              </div>
              <Link
                href={`/${lang}/enroll?course=${slug}`}
                className="mt-6 block w-full rounded-full bg-green-900 px-5 py-3 text-center text-sm font-medium text-gold-100 transition hover:bg-green-700"
              >
                {dict.coursePage.enrollNow}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
