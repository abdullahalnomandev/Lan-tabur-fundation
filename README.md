# Lantabur Foundation Website

A bilingual (Bangla-default / English) Next.js website for লানতাবুর ফাউন্ডেশন,
built from the foundation's profile document, with a member enrollment page
and a manual bKash payment flow.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — it redirects to `/bn` (Bangla) by default.
Switch language with the "EN" / "বাং" button in the header, which takes you
to the same page under `/en`.

## Before you launch — things you must edit

1. **`src/lib/config.ts`**
   - `bkashNumber`: replace with your real bKash "Send Money" number.
   - `registrationFeeBDT`: confirm the actual membership/registration fee.
   - `chairmanMobile`: replace with the real contact number (currently a placeholder).
   Both the homepage contact section and the enroll page read from this file
   and from the dictionaries below, so update both.

2. **`src/lib/dictionaries/bn.ts`** and **`src/lib/dictionaries/en.ts`**
   - `contact.mobileValue` (currently a placeholder — I could not reliably
     read the phone number from the source PDF's image and didn't want to
     guess at a real contact detail).
   - Any wording you'd like to adjust; both files must be kept in sync
     (same keys/shape) since the site is a straight mirror between the two.

3. **Enrollment storage** — `src/app/api/enroll/route.ts` currently appends
   submissions to `data/enrollments.json` on the server's local disk. This
   works for a normal Node.js server (e.g. a VPS) but **not** for serverless
   hosts like Vercel, where the filesystem is read-only/ephemeral. Before
   launch, swap this for a real database (Postgres, MongoDB, etc.) or a
   notification service (e.g. Resend for email, or the Google Sheets API),
   and add authentication before exposing any admin view of the data.

4. **bKash payments are manual, not gateway-integrated.** The enroll page
   shows your Send Money number and collects the Transaction ID (TrxID) the
   member receives after paying — someone on your team needs to verify each
   TrxID in the bKash merchant/personal account and then follow up with the
   member. If you later get bKash Merchant/PGW API credentials (App Key/
   Secret, Username/Password), the payment step can be upgraded to a real
   automatic checkout — ask and this can be wired in.

## Project structure

- `src/app/[lang]/` — the bn/en routed pages (home, /enroll)
- `src/app/api/enroll/` — enrollment submission API route
- `src/lib/dictionaries/` — all Bangla + English site copy
- `src/lib/config.ts` — editable constants (bKash number, fee)
- `src/components/` — Header, Footer, EnrollForm, decorative SVG ornaments

## Fonts

Uses self-hosted (via `@fontsource`) Bangla/Latin webfonts — **Tiro Bangla**
(headings), **Hind Siliguri** (body, Bangla+Latin), and **Cormorant
Garamond** (English headings) — rather than "Adorsholipi", which is a
legacy ANSI/Bijoy-encoded font family that isn't Unicode-compatible and
can't be reliably used as a web font.
