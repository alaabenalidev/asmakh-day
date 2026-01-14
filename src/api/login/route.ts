import { NextResponse } from "next/server";
import { checkUserLogin } from "@/lib/googleSheetsServer";

export async function POST(request: Request) {
  try {
    const { employeeId, password } = await request.json();
    const user = await checkUserLogin(employeeId, password);

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json(
      { message: "Failed to login" },
      { status: 500 }
    );
  }
}
