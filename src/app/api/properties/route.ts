import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: { photos: true, wholesalers: true },
    });
    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      address,
      city,
      state,
      zip,
      county,
      price,
      beds,
      baths,
    } = data;
    const property = await prisma.property.create({
      data: { address, city, state, zip, county, price, beds, baths },
    });
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
