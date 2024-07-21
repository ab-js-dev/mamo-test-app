import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://mamo-mock-server.glitch.me/expenses';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const response = await fetch(EXTERNAL_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses from external API');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from external API');
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);

    return NextResponse.json(paginatedData);
  } catch (error) {
    console.error('Error fetching expenses:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
