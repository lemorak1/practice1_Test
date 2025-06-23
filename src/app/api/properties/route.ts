import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const where: any = {};

    const address = searchParams.get('address');
    if (address) where.address = { contains: address, mode: 'insensitive' };

    const city = searchParams.get('city');
    if (city) where.city = { contains: city, mode: 'insensitive' };

    const county = searchParams.get('county');
    if (county) where.county = { contains: county, mode: 'insensitive' };

    const minPrice = parseInt(searchParams.get('minPrice') || '');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '');
    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      where.price = {};
      if (!isNaN(minPrice)) where.price.gte = minPrice;
      if (!isNaN(maxPrice)) where.price.lte = maxPrice;
    }

    const beds = parseInt(searchParams.get('beds') || '');
    if (!isNaN(beds)) where.beds = { gte: beds };

    const baths = parseFloat(searchParams.get('baths') || '');
    if (!isNaN(baths)) where.baths = { gte: baths };

    const properties = await prisma.property.findMany({
      where,
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
