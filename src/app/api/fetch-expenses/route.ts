import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API_URL = 'https://mamo-mock-server.glitch.me/expenses';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const response = await fetch(EXTERNAL_API_URL);
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }

  const data = await response.json();
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = data.slice(start, end);

  return NextResponse.json(paginatedData);
}