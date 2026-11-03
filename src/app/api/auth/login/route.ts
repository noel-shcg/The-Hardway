import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Simple hardcoded password - in production, use proper auth
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'thehardway';
  
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  return NextResponse.json(
    { authenticated: cookieStore.get('auth')?.value === 'true' },
    { status: cookieStore.get('auth')?.value === 'true' ? 200 : 401 },
  );
}
