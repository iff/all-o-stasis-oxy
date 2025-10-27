import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const gymName = hostname.split('.')[0];

  const response = NextResponse.next();
  response.headers.set('x-gym', gymName);
  return response;
}
