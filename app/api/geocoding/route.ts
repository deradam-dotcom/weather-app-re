import { type NextRequest, NextResponse } from "next/server";

import { fetchGeocoding } from "@/lib/open-meteo";

export const GET = async (request: NextRequest) => {
  const name = request.nextUrl.searchParams.get("name")?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await fetchGeocoding(name);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Nem sikerült lefuttatni a keresést" },
      { status: 502 },
    );
  }
};
