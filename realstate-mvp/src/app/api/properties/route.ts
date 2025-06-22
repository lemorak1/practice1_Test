import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const properties = await prisma.property.findMany();
  return NextResponse.json(properties);
}

export async function POST(request: Request) {
  const data = await request.json();
  const property = await prisma.property.create({ data });
  return NextResponse.json(property);
}