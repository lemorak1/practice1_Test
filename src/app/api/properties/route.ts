import { NextResponse } from 'next/server';
import {
  getProperties,
  createProperty,
} from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: any = {};

    const address = searchParams.get('address');
    if (address) filters.address = address;

    const city = searchParams.get('city');
    if (city) filters.city = city;

    const county = searchParams.get('county');
    if (county) filters.county = county;

    const minPrice = parseInt(searchParams.get('minPrice') || '');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '');
    if (!isNaN(minPrice)) filters.minPrice = minPrice;
    if (!isNaN(maxPrice)) filters.maxPrice = maxPrice;

    const beds = parseInt(searchParams.get('beds') || '');
    if (!isNaN(beds)) filters.beds = beds;

    const baths = parseFloat(searchParams.get('baths') || '');
    if (!isNaN(baths)) filters.baths = baths;

    const properties = await getProperties(filters);
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
    const property = await createProperty({
      address,
      city,
      state,
      zip,
      county,
      price,
      beds,
      baths,
    });
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
