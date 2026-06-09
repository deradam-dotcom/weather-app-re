import { type NextRequest, NextResponse } from "next/server";

import { fetchForecast } from "@/lib/open-meteo";

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const latitude = Number(searchParams.get("latitude"));
  const longitude = Number(searchParams.get("longitude"));

  const hasValidCoordinates =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180;

  if (!hasValidCoordinates) {
    return NextResponse.json(
      { error: "Érvénytelen koordináták" },
      { status: 400 },
    );
  }

  try {
    const forecast = await fetchForecast(latitude, longitude);
    return NextResponse.json(forecast);
  } catch {
    return NextResponse.json(
      { error: "Nem sikerült lekérni az előrejelzést" },
      { status: 502 },
    );
  }
};
