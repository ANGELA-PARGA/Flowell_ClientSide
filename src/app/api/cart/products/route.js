import { NextResponse } from 'next/server';
import { cookieFetchVerification } from '@/lib/cookieVerification';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const parseResponseJson = async (response) => {
    try {
        return await response.json();
    } catch {
        return null;
    }
};

export async function POST(request) {
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const { product_id, qty } = await request.json();

    const response = await fetch(`${backendUrl}/products`, {
        method: 'POST',
        body: JSON.stringify({ product_id, qty }),
        headers: {
            'Content-Type': 'application/json',
            cookie: cookieForServer,
        },
    });

    const responsePayload = await parseResponseJson(response);

    if (!response.ok) {
        return NextResponse.json(responsePayload ?? { error: 'Failed to add product to cart' }, { status: response.status });
    }

    return NextResponse.json(responsePayload, { status: 200 });
}
