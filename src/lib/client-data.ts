import { Vehicle, BlogPost, Review } from '@/types';

const API_BASE = '/api';

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch(`${API_BASE}/vehicles`);
  return res.json();
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  const res = await fetch(`${API_BASE}/vehicles/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export async function createVehicle(vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
  const res = await fetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicle),
  });
  return res.json();
}

export async function updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function deleteVehicle(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: 'DELETE',
  });
  return res.ok;
}

export async function addReviewToVehicle(
  vehicleId: string,
  review: Omit<Review, 'id' | 'date'>
): Promise<Vehicle | null> {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) return null;
  
  const newReview = {
    ...review,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  const updated = await updateVehicle(vehicleId, {
    reviews: [...vehicle.reviews, newReview],
  });
  return updated;
}

export async function deleteReviewFromVehicle(
  vehicleId: string,
  reviewId: string
): Promise<Vehicle | null> {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) return null;
  
  const updated = await updateVehicle(vehicleId, {
    reviews: vehicle.reviews.filter(r => r.id !== reviewId),
  });
  return updated;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE}/blog`);
  return res.json();
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const res = await fetch(`${API_BASE}/blog/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const res = await fetch(`${API_BASE}/blog/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/blog/${id}`, {
    method: 'DELETE',
  });
  return res.ok;
}
