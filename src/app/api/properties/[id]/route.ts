import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: Request, { params }: any) {
  const id = Number(params.id);
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: { photos: true, wholesalers: true },
    });
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: any) {
  const id = Number(params.id);
  try {
    const data = await request.json();
    const property = await prisma.property.update({
      where: { id },
      data,
    });
    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: any) {
  const id = Number(params.id);
  try {
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
