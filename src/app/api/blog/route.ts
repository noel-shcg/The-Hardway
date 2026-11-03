import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const blogPostsFile = path.join(dataDir, 'blog-posts.json');

export async function GET() {
  try {
    const data = fs.readFileSync(blogPostsFile, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const posts = JSON.parse(fs.readFileSync(blogPostsFile, 'utf-8'));
  const now = new Date().toISOString();
  const newPost = {
    ...body,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
  };
  posts.push(newPost);
  fs.writeFileSync(blogPostsFile, JSON.stringify(posts, null, 2));
  return NextResponse.json(newPost);
}
