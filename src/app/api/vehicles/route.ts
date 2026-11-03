import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const vehiclesFile = path.join(dataDir, 'vehicles.json');

export async function GET() {
  try {
    const data = fs.readFileSync(vehiclesFile, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const vehicles = JSON.parse(fs.readFileSync(vehiclesFile, 'utf-8'));
  const newVehicle = {
    ...body,
    id: Date.now().toString(),
    reviews: body.reviews || [],
  };
  vehicles.push(newVehicle);
  fs.writeFileSync(vehiclesFile, JSON.stringify(vehicles, null, 2));
  return NextResponse.json(newVehicle);
}
