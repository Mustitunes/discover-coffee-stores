import { fetchCoffeeStores } from '@/lib/fetchCoffeeStores';
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const longLat = searchParams.get('longLat') || '';
        const limit = searchParams.get('limit') || '';

        if (longLat) {
            const response = await fetchCoffeeStores(longLat, parseInt(limit));
            return NextResponse.json(response);
        }
    } catch (error) {
        console.error('There is an error', error);
        NextResponse.json(`something went wrong ${error}`, {
            status: 500,
        });
    }
}
