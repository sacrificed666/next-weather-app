import { NextRequest, NextResponse } from "next/server";
import { OPENWEATHERMAP_BASE_URL } from "@/constants/api";

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city")!;

  const url = new URL("weather", OPENWEATHERMAP_BASE_URL);
  url.searchParams.set("q", city);
  url.searchParams.set("appid", API_KEY!);
  url.searchParams.set("units", "metric");

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
