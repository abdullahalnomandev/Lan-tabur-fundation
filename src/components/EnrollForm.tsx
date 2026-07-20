"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

export default function EnrollForm({
  dict,
  lang,
  selectedCourseSlug,
}: {
  dict: Dictionary;
  lang: Locale;
  selectedCourseSlug?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trxId, setTrxId] = useState("");
  const [course, setCourse] = useState(selectedCourseSlug || "");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const selectedCourse = dict.coursesSection?.items?.find((c) => c.slug === course);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !phone.trim() || !trxId.trim() || !course) {
      setErrorMsg(dict.enroll.errorRequired);
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setErrorMsg(dict.enroll.errorEmail);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          trxId: trxId.trim(),
          amount: siteConfig.registrationFeeBDT,
          course,
          lang,
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(dict.enroll.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-[var(--hairline)] bg-[var(--parchment-deep)]/60 p-8 text-center">
        <h2 className="font-heading text-2xl text-green-950">{dict.enroll.successTitle}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{dict.enroll.successBody}</p>
        <Link
         href="/"
          className="mt-6 rounded-full bg-green-900 px-6 py-2.5 text-sm font-medium text-gold-100 transition hover:bg-green-700"
        >
          Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Personal info */}
      <fieldset className="space-y-5">
        <legend className="font-heading text-lg text-green-950">{dict.enroll.formTitle}</legend>

        <div>
          <label htmlFor="course" className="block text-sm font-medium text-ink/75">
            কোর্স নির্বাচন করুন
          </label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-[var(--hairline)] bg-white px-4 py-2.5 text-ink outline-none transition focus:border-green-700"
            required
          >
            <option value="">কোর্স নির্বাচন করুন</option>
            {dict.coursesSection?.items?.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink/75">
            {dict.enroll.nameLabel}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={dict.enroll.namePlaceholder}
            className="mt-1.5 w-full rounded-sm border border-[var(--hairline)] bg-white px-4 py-2.5 text-ink outline-none transition focus:border-green-700"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink/75">
            {dict.enroll.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.enroll.emailPlaceholder}
            className="mt-1.5 w-full rounded-sm border border-[var(--hairline)] bg-white px-4 py-2.5 text-ink outline-none transition focus:border-green-700"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink/75">
            {dict.enroll.phoneLabel}
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={dict.enroll.phonePlaceholder}
            className="mt-1.5 w-full rounded-sm border border-[var(--hairline)] bg-white px-4 py-2.5 text-ink outline-none transition focus:border-green-700"
            required
          />
        </div>
      </fieldset>

      {/* bKash payment instructions */}
      <fieldset className="rounded-sm border border-gold-600/30 bg-gold-100/40 p-6">
        <legend className="px-1 font-heading text-lg text-green-950">
          {dict.enroll.paymentTitle}
        </legend>

        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink/80">
          {dict.enroll.paymentSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm bg-white/70 p-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">
              {dict.enroll.bkashNumberLabel}
            </p>
            <p className="mt-1 font-heading text-xl text-green-950">
              {siteConfig.bkashNumber}
            </p>
          </div>
          <div className="rounded-sm bg-white/70 p-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">
              {dict.enroll.amountLabel}
            </p>
            <p className="mt-1 font-heading text-xl text-green-950">
              ৳ {siteConfig.registrationFeeBDT}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="trxId" className="block text-sm font-medium text-ink/75">
            {dict.enroll.trxLabel}
          </label>
          <input
            id="trxId"
            type="text"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value.toUpperCase())}
            placeholder={dict.enroll.trxPlaceholder}
            className="mt-1.5 w-full rounded-sm border border-[var(--hairline)] bg-white px-4 py-2.5 uppercase tracking-wide text-ink outline-none transition focus:border-green-700"
            required
          />
        </div>
      </fieldset>

      {errorMsg && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-green-900 px-6 py-3.5 text-sm font-semibold text-gold-100 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? dict.enroll.submitting : dict.enroll.submit}
      </button>

      <p className="text-center text-xs leading-relaxed text-ink/50">{dict.enroll.note}</p>
    </form>
  );
}
