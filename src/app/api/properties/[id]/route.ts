import { NextResponse } from 'next/server';
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
} from '../../../../lib/db';

export async function GET(request: Request, { params }: any) {
  const id = Number(params.id);
  try {
    const property = await getPropertyById(id);
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
    const property = await updateProperty(id, {
      address,
      city,
      state,
      zip,
      county,
      price,
      beds,
      baths,
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
    await deleteProperty(id);
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
