import { NextResponse } from 'next/server';
import { createPhoto } from '../../../lib/db';
import { uploadBuffer } from '../../../lib/firebase';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'File missing' }, { status: 400 });
  }
  const propertyId = formData.get('propertyId');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const url = await uploadBuffer(buffer, filename, file.type);
  const data: any = { url };
  if (propertyId) data.propertyId = Number(propertyId);
  const photo = await createPhoto(data);
  return NextResponse.json(photo, { status: 201 });
}
