import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "enrollments.json");

type Enrollment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  trxId: string;
  amount: number;
  course?: string;
  lang: string;
  createdAt: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Partial<Enrollment>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const phone = (body.phone ?? "").toString().trim();
  const trxId = (body.trxId ?? "").toString().trim();
  const amount = Number(body.amount) || 0;
  const course = body.course ? (body.course as string).toString() : undefined;
  const lang = (body.lang ?? "bn").toString();

  if (!name || !email || !phone || !trxId) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const entry: Enrollment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    phone,
    trxId,
    amount,
    course,
    lang,
    createdAt: new Date().toISOString(),
  };

  // NOTE: This stores submissions in a local JSON file, which is fine for
  // local development or a traditional (non-serverless) server. On
  // serverless hosts (e.g. Vercel) the filesystem is read-only/ephemeral —
  // swap this out for a database (Postgres, MongoDB, etc.) or an email/
  // notification service (Resend, Google Sheets API, etc.) before launch.
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let existing: Enrollment[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      existing = [];
    }
    existing.push(entry);
    await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist enrollment:", err);
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: entry.id });
}
