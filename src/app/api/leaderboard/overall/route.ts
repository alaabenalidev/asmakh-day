import { NextResponse } from "next/server";
import { getOverallLeaderboard } from "@/lib/googleSheetsServer";

export async function GET() {
  try {
    const leaderboard = await getOverallLeaderboard();
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Error in overall leaderboard API:", error);
    return NextResponse.json(
      { message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
