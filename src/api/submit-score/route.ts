import { NextResponse } from "next/server";
import { appendScore } from "@/lib/googleSheetsServer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await appendScore(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in submit-score API:", error);
    return NextResponse.json(
      { message: "Failed to submit score" },
      { status: 500 }
    );
  }
}
