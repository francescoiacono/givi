import { NextResponse } from 'next/server';

export const errorRequestHandler = (
  statusCode: number,
  message: string
): NextResponse => {
  return NextResponse.json({
    statusCode,
    status: 'error',
    message
  });
};
