import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  const property = await prisma.property.findUnique({ where: { id: Number(params.id) } });
  return NextResponse.json(property);
}

export async function PUT(request: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  const data = await request.json();
  const property = await prisma.property.update({ where: { id: Number(params.id) }, data });
  return NextResponse.json(property);
}

export async function DELETE(_request: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  await prisma.property.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}