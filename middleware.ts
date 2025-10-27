import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const gymName = hostname.split('.')[0];

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-gym', gymName);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
