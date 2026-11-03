import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const blogPostsFile = path.join(dataDir, 'blog-posts.json');

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const posts = JSON.parse(fs.readFileSync(blogPostsFile, 'utf-8'));
  const post = posts.find((p: any) => p.id === id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const posts = JSON.parse(fs.readFileSync(blogPostsFile, 'utf-8'));
  const index = posts.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  posts[index] = { 
    ...posts[index], 
    ...body, 
    updatedAt: new Date().toISOString() 
  };
  fs.writeFileSync(blogPostsFile, JSON.stringify(posts, null, 2));
  return NextResponse.json(posts[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const posts = JSON.parse(fs.readFileSync(blogPostsFile, 'utf-8'));
  const filtered = posts.filter((p: any) => p.id !== id);
  if (filtered.length === posts.length) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  fs.writeFileSync(blogPostsFile, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
