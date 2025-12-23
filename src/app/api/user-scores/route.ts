import { NextResponse } from "next/server";
import { getUserScores } from "@/lib/googleSheetsServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const employeeId = searchParams.get("employeeId");

  if (!employeeId) {
    return NextResponse.json(
      { message: "Employee ID is required" },
      { status: 400 }
    );
  }

  try {
    const scores = await getUserScores(employeeId);
    return NextResponse.json(scores);
  } catch (error) {
    console.error("Error in user-scores API:", error);
    return NextResponse.json(
      { message: "Failed to fetch user scores" },
      { status: 500 }
    );
  }
}
