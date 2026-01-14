import { NextResponse } from "next/server";
import { getGameLeaderboard } from "@/lib/googleSheetsServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const game = searchParams.get("game");

  if (!game) {
    return NextResponse.json(
      { message: "Game name is required" },
      { status: 400 }
    );
  }

  try {
    const leaderboard = await getGameLeaderboard(game);
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error(`Error in ${game} leaderboard API:`, error);
    return NextResponse.json(
      { message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
