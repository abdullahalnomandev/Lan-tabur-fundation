import { getDictionary, locales, asLocale } from "@/lib/dictionaries";
import { CornerOrnament, StarDivider } from "@/components/Ornament";
import EnrollForm from "@/components/EnrollForm";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function EnrollPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang: rawLang } = await params;
  const lang = asLocale(rawLang);
  const dict = getDictionary(lang);
  const { course } = await searchParams;

  return (
    <section className="relative">
      <div className="border-b border-[var(--hairline)] bg-green-950 py-16 text-center text-parchment">
        <CornerOrnament className="absolute left-5 top-5 h-12 w-12 text-gold-300/60" />
        <p className="text-xs uppercase tracking-[0.24em] text-gold-300/90">
          {dict.enroll.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-3xl text-parchment md:text-4xl">
          {dict.enroll.title}
        </h1>
        <StarDivider className="mx-auto mt-5 h-4 w-28 text-gold-300" />
        <p className="mx-auto mt-5 max-w-xl px-6 text-sm leading-relaxed text-parchment/75">
          {dict.enroll.subtitle}
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <EnrollForm
          dict={dict}
          lang={lang}
          selectedCourseSlug={typeof course === "string" ? course : undefined}
        />
      </div>
    </section>
  );
}
