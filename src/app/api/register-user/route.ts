import { NextResponse } from "next/server";
import { appendRegistration } from "@/lib/googleSheetsServer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await appendRegistration(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in register-user API:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
}
