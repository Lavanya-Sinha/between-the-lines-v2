import { NextResponse } from "next/server";
import requireUser from "@/lib/auth/requireUser";
import getDashboard from "@/lib/books/getDashboard";

export async function GET(request) {
  try {
    const user = await requireUser();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("q") ?? "";

    const books = await getDashboard({
      userId: user.id,
      search,
    });

    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}