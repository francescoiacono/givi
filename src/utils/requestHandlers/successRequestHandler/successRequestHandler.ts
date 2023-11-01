import { NextResponse } from 'next/server';

export const successRequestHandler = <T>(
  data: T,
  statusCode = 200
): NextResponse => {
  return NextResponse.json({
    statusCode,
    status: 'success',
    data
  });
};
