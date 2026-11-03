'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { addReviewToVehicle } from '@/lib/client-data';

export const dynamic = 'force-dynamic';

export default function AddReview() {
  const router = useRouter();
  const params = useParams();
  
  const [formData, setFormData] = useState({
    author: '',
    content: '',
    rating: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReviewToVehicle(params.id as string, formData);
    router.push(`/fleet/${params.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-navy mb-8">Add Review</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-navy font-medium mb-2">Your Name</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            required
          />
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className={`text-3xl transition-colors ${
                  star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'
                } hover:text-yellow-500`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Review</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy min-h-[150px]"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-navy text-cream px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={() => router.push(`/fleet/${params.id}`)}
            className="bg-cream-dark text-navy px-6 py-3 rounded-lg hover:bg-cream transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
