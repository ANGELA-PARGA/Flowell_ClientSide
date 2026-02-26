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

export async function DELETE(_request, { params }) {
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const { id } = await params;

    const response = await fetch(`${backendUrl}/cart/${id}`, {
        method: 'DELETE',
        headers: {
            cookie: cookieForServer,
        },
    });

    const responsePayload = await parseResponseJson(response);

    if (!response.ok) {
        return NextResponse.json(responsePayload ?? { error: 'Failed to delete cart item' }, { status: response.status });
    }

    return NextResponse.json(responsePayload, { status: 200 });
}
