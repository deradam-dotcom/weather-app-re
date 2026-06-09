import { cacheLife } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { fetchGeocoding } from "@/lib/open-meteo";

async function getCachedGeocoding(name: string) {
  "use cache";
  cacheLife("hours");
  return fetchGeocoding(name);
}

export const GET = async (request: NextRequest) => {
  const name = request.nextUrl.searchParams.get("name")?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await getCachedGeocoding(name);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Nem sikerült lefuttatni a keresést" },
      { status: 502 },
    );
  }
};
