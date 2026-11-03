import fs from 'fs';
import path from 'path';
import { Vehicle, BlogPost } from '@/types';

const dataDir = path.join(process.cwd(), 'data');
const vehiclesFile = path.join(dataDir, 'vehicles.json');
const blogPostsFile = path.join(dataDir, 'blog-posts.json');

export function getVehicles(): Vehicle[] {
  try {
    const data = fs.readFileSync(vehiclesFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveVehicles(vehicles: Vehicle[]): void {
  fs.writeFileSync(vehiclesFile, JSON.stringify(vehicles, null, 2));
}

export function getVehicleById(id: string): Vehicle | undefined {
  const vehicles = getVehicles();
  return vehicles.find(v => v.id === id);
}

export function createVehicle(vehicle: Omit<Vehicle, 'id'>): Vehicle {
  const vehicles = getVehicles();
  const newVehicle: Vehicle = {
    ...vehicle,
    id: Date.now().toString(),
  };
  vehicles.push(newVehicle);
  saveVehicles(vehicles);
  return newVehicle;
}

export function updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | null {
  const vehicles = getVehicles();
  const index = vehicles.findIndex(v => v.id === id);
  if (index === -1) return null;
  
  vehicles[index] = { ...vehicles[index], ...updates };
  saveVehicles(vehicles);
  return vehicles[index];
}

export function deleteVehicle(id: string): boolean {
  const vehicles = getVehicles();
  const filtered = vehicles.filter(v => v.id !== id);
  if (filtered.length === vehicles.length) return false;
  saveVehicles(filtered);
  return true;
}

export function addReviewToVehicle(vehicleId: string, review: Omit<import('@/types').Review, 'id' | 'date'>): Vehicle | null {
  const vehicles = getVehicles();
  const index = vehicles.findIndex(v => v.id === vehicleId);
  if (index === -1) return null;
  
  const newReview = {
    ...review,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  vehicles[index].reviews.push(newReview);
  saveVehicles(vehicles);
  return vehicles[index];
}

export function deleteReviewFromVehicle(vehicleId: string, reviewId: string): Vehicle | null {
  const vehicles = getVehicles();
  const index = vehicles.findIndex(v => v.id === vehicleId);
  if (index === -1) return null;
  
  vehicles[index].reviews = vehicles[index].reviews.filter(r => r.id !== reviewId);
  saveVehicles(vehicles);
  return vehicles[index];
}

export function getBlogPosts(): BlogPost[] {
  try {
    const data = fs.readFileSync(blogPostsFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveBlogPosts(posts: BlogPost[]): void {
  fs.writeFileSync(blogPostsFile, JSON.stringify(posts, null, 2));
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(p => p.id === id);
}

export function createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
  const posts = getBlogPosts();
  const now = new Date().toISOString();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
  };
  posts.push(newPost);
  saveBlogPosts(posts);
  return newPost;
}

export function updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  posts[index] = { 
    ...posts[index], 
    ...updates, 
    updatedAt: new Date().toISOString() 
  };
  saveBlogPosts(posts);
  return posts[index];
}

export function deleteBlogPost(id: string): boolean {
  const posts = getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  if (filtered.length === posts.length) return false;
  saveBlogPosts(filtered);
  return true;
}
