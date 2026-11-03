import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const vehiclesFile = path.join(dataDir, 'vehicles.json');

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const vehicles = JSON.parse(fs.readFileSync(vehiclesFile, 'utf-8'));
  const vehicle = vehicles.find((v: any) => v.id === id);
  if (!vehicle) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
  }
  return NextResponse.json(vehicle);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const vehicles = JSON.parse(fs.readFileSync(vehiclesFile, 'utf-8'));
  const index = vehicles.findIndex((v: any) => v.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
  }
  vehicles[index] = { ...vehicles[index], ...body };
  fs.writeFileSync(vehiclesFile, JSON.stringify(vehicles, null, 2));
  return NextResponse.json(vehicles[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const vehicles = JSON.parse(fs.readFileSync(vehiclesFile, 'utf-8'));
  const filtered = vehicles.filter((v: any) => v.id !== id);
  if (filtered.length === vehicles.length) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
  }
  fs.writeFileSync(vehiclesFile, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
