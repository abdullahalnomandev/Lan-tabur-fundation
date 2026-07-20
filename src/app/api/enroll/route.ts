import { NextRequest, NextResponse } from "next/server";
import { appendEnrollment } from "@/lib/google-sheet";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await appendEnrollment(body);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}