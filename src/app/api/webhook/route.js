// app/api/webhook/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import crypto from 'crypto';


const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

const rateLimitStore = new Map();

/**
 * Checks if the IP has exceeded the rate limit.
 * @param {string} ip - The IP address of the request.
 * @returns {boolean} - True if the request is allowed, false if rate limited.
 */
function checkRateLimit(ip) {
    const now = Date.now();
    let entry = rateLimitStore.get(ip);
    if (!entry) {
        rateLimitStore.set(ip, { count: 1, startTime: now });
        return true;
    }
    if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.set(ip, { count: 1, startTime: now });
        return true;
    }
    
    if (entry.count < MAX_REQUESTS_PER_WINDOW) {
        entry.count++;
        return true;
    }
    return false;
}

/**
 * Verifies the HMAC signature of the request body.
 * @param {string} body - The raw request body as a string.
 * @param {string} signature - The signature from the request header.
 * @param {string} secret - The shared secret.
 * @returns {boolean} - True if the computed HMAC matches the signature.
 */
function verifySignature(body, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const computedSignature = hmac.digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));
}

export async function POST(request) {
  // --- Rate Limiting ---
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
  if (!checkRateLimit(ip)) {
    console.error(`Rate limit exceeded for IP: ${ip}`);
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  }

  // --- Parse the Request Body ---
  let bodyText;
  try {
    bodyText = await request.text();
  } catch (error) {
    console.error('Error reading request body:', error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  // --- HMAC Signature Verification ---
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error('WEBHOOK_SECRET is not set in environment variables.');
    return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 });
  }
  const signature = request.headers.get('x-webhook-signature');
  if (!signature) {
    console.error('Missing x-webhook-signature header.');
    return NextResponse.json({ message: 'Missing signature' }, { status: 401 });
  }
  if (!verifySignature(bodyText, signature, secret)) {
    console.error('Signature verification failed.');
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  // --- Parse JSON Body ---
  let payload;
  try {
    payload = JSON.parse(bodyText);
  } catch (error) {
    console.error('Invalid JSON payload:', error);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const { path, tag } = payload; // Expecting both `path` and `tag` in the payload
  if (!path && !tag) {
    console.error('Payload missing "path" and "tag" properties.');
    return NextResponse.json({ message: 'Missing path or tag in payload' }, { status: 400 });
  }

  // --- Trigger Revalidation ---
  try {
    if (path) {
      revalidatePath(path); // Revalidate the specific route
    }

    if (tag) {
      revalidateTag(tag); // Revalidate all routes associated with the tag
    }

    return NextResponse.json({ revalidated: true, path, tag });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json({ message: 'Error revalidating', error: error.message }, { status: 500 });
  }
}
