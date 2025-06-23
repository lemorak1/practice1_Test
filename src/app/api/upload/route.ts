import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'File missing' }, { status: 400 });
  }
  const propertyId = formData.get('propertyId');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  const filename = `${Date.now()}-${file.name}`;
  await writeFile(path.join(uploadsDir, filename), buffer);
  const url = `/uploads/${filename}`;
  const data: any = { url };
  if (propertyId) data.propertyId = Number(propertyId);
  const photo = await prisma.photo.create({ data });
  return NextResponse.json(photo, { status: 201 });
}
