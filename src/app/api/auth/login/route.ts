import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Simple hardcoded password - in production, use proper auth
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'thehardway';
  
  if (password === ADMIN_PASSWORD) {
    const cookieStore = cookies();
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
  const cookieStore = cookies();
  cookieStore.delete('auth');
  return NextResponse.json({ success: true });
}
