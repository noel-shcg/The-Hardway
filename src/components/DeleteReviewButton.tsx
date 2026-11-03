'use client';

import { deleteReviewFromVehicle } from '@/lib/client-data';
import { useRouter } from 'next/navigation';

interface DeleteReviewButtonProps {
  vehicleId: string;
  reviewId: string;
}

export default function DeleteReviewButton({ vehicleId, reviewId }: DeleteReviewButtonProps) {
  const router = useRouter();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReviewFromVehicle(vehicleId, reviewId);
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-700 text-sm font-medium"
    >
      Delete
    </button>
  );
}
