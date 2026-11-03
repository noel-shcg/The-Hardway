'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getVehicleById, updateVehicle } from '@/lib/client-data';
import Link from 'next/link';
import DeleteReviewButton from '@/components/DeleteReviewButton';
import EditPhotoMetadata from '@/components/EditPhotoMetadata';
import { ImageMetadata, Vehicle } from '@/types';
import ImageLightbox from '@/components/ImageLightbox';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

const statusColors = {
  'service-worthy': 'bg-green-500',
  'off-road': 'bg-orange-500',
  'away': 'bg-gray-500',
  'trainer': 'bg-yellow-500',
  'auxillary': 'bg-blue-500',
};

export default function VehicleDetail() {
  const params = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadVehicle = async () => {
      const v = await getVehicleById(params.id as string);
      setVehicle(v ?? null);
      setLoading(false);
    };
    loadVehicle();
    fetch('/api/auth/login').then((response) => setIsLoggedIn(response.ok)).catch(() => setIsLoggedIn(false));
  }, [params.id]);

  const handlePhotoMetadataUpdate = async (index: number, metadata: ImageMetadata) => {
    if (!vehicle) return;
    const updatedAlbum = [...vehicle.photoAlbum];
    updatedAlbum[index] = metadata;
    const updated = await updateVehicle(params.id as string, { photoAlbum: updatedAlbum });
    if (updated) setVehicle(updated);
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Vehicle not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        href="/fleet"
        className="text-navy-light hover:text-navy transition-colors mb-6 inline-block"
      >
        ← Back to Fleet
      </Link>

      {vehicle.primaryPhoto && (
        <div className="mb-8">
          <img
            src={vehicle.primaryPhoto}
            alt={`Vehicle ${vehicle.fleetNumber}`}
            className="w-full h-96 object-cover rounded-lg"
          />
          {vehicle.primaryPhotoMetadata && (vehicle.primaryPhotoMetadata.title || vehicle.primaryPhotoMetadata.description) && (
            <div className="bg-cream-dark p-4 rounded-lg mt-2">
              {vehicle.primaryPhotoMetadata.title && (
                <p className="font-bold text-navy">{vehicle.primaryPhotoMetadata.title}</p>
              )}
              {vehicle.primaryPhotoMetadata.description && (
                <p className="text-navy-light">{vehicle.primaryPhotoMetadata.description}</p>
              )}
              {(vehicle.primaryPhotoMetadata.location || vehicle.primaryPhotoMetadata.date || vehicle.primaryPhotoMetadata.time) && (
                <div className="text-sm text-navy-light flex flex-wrap gap-3 mt-2">
                  {vehicle.primaryPhotoMetadata.location && <span>📍 {vehicle.primaryPhotoMetadata.location}</span>}
                  {vehicle.primaryPhotoMetadata.date && <span>📅 {vehicle.primaryPhotoMetadata.date}</span>}
                  {vehicle.primaryPhotoMetadata.time && <span>🕐 {vehicle.primaryPhotoMetadata.time}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-navy">
              {vehicle.fleetNumber} - {vehicle.registration}
            </h1>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${statusColors[vehicle.status]}`} />
              <span className="capitalize text-navy-light">
                {vehicle.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-navy mb-4">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-navy-light font-medium">Vehicle Type</p>
                <p className="text-navy">{vehicle.vehicleType}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Engine Type</p>
                <p className="text-navy">{vehicle.engineType}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Gearbox Type</p>
                <p className="text-navy">{vehicle.gearboxType}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Chassis Type</p>
                <p className="text-navy">{vehicle.chassisType}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Emissions Rating</p>
                <p className="text-navy capitalize">{vehicle.emissionsRating}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Livery</p>
                <p className="text-navy">{vehicle.livery}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Branding</p>
                <p className="text-navy">{vehicle.branding}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Vehicle Delivered</p>
                <p className="text-navy">{vehicle.vehicleDelivered}</p>
              </div>
              <div>
                <p className="text-navy-light font-medium">Joined Fleet</p>
                <p className="text-navy">{vehicle.vehicleJoinedFleet}</p>
              </div>
            </div>

            {vehicle.features.length > 0 && (
              <div className="mt-4">
                <p className="text-navy-light font-medium mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-navy-light text-cream px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {vehicle.history && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-navy mb-4">History</h2>
              <p className="text-navy whitespace-pre-wrap">{vehicle.history}</p>
            </div>
          )}

          {vehicle.photoAlbum.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-navy mb-4">Photo Album</h2>
              <ImageLightbox images={vehicle.photoAlbum.map((photo) => typeof photo === 'string' ? photo : photo.url)} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {vehicle.photoAlbum.map((photo, index) => (
                  <div key={index} className="space-y-2">
                    <img
                      src={typeof photo === 'string' ? photo : photo.url}
                      alt={typeof photo === 'string' ? `Photo ${index + 1}` : photo.title || `Photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {typeof photo !== 'string' && (
                      <>
                        {(photo.title || photo.description || photo.location || photo.date) && (
                          <div className="bg-cream-dark p-3 rounded-lg space-y-1">
                            {photo.title && (
                              <p className="font-bold text-navy">{photo.title}</p>
                            )}
                            {photo.description && (
                              <p className="text-sm text-navy-light">{photo.description}</p>
                            )}
                            {(photo.location || photo.date || photo.time) && (
                              <div className="text-xs text-navy-light flex flex-wrap gap-2">
                                {photo.location && <span>📍 {photo.location}</span>}
                                {photo.date && <span>📅 {photo.date}</span>}
                                {photo.time && <span>🕐 {photo.time}</span>}
                              </div>
                            )}
                          </div>
                        )}
                        <EditPhotoMetadata
                          photo={photo}
                          index={index}
                          onUpdate={handlePhotoMetadataUpdate}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-navy mb-4">Reviews</h2>
            {vehicle.reviews.length > 0 && (
              <div className="bg-cream-dark rounded-lg p-4 mb-6">
                <p className="text-navy font-bold text-lg">
                  Average rating: {(vehicle.reviews.reduce((sum, review) => sum + review.rating, 0) / vehicle.reviews.length).toFixed(1)} / 5
                </p>
                <div className="flex gap-2 text-sm text-navy-light mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <span key={rating}>{rating}: {vehicle.reviews.filter((review) => review.rating === rating).length}</span>
                  ))}
                </div>
              </div>
            )}
            {vehicle.reviews.length === 0 ? (
              <p className="text-navy-light">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {vehicle.reviews.map((review) => (
                  <div key={review.id} className="border-b border-cream-dark pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-navy">{review.author}</p>
                        <p className="text-sm text-navy-light">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        {isLoggedIn && <DeleteReviewButton vehicleId={vehicle.id} reviewId={review.id} />}
                      </div>
                    </div>
                    <p className="text-navy">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-navy mb-4">Livery</h2>
            {vehicle.liveryImage && (
              <div>
                <div className="aspect-[38/26] overflow-hidden rounded-lg">
                  <img
                    src={vehicle.liveryImage}
                    alt={`${vehicle.livery} livery`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {vehicle.liveryImageMetadata && (vehicle.liveryImageMetadata.title || vehicle.liveryImageMetadata.description) && (
                  <div className="bg-cream-dark p-3 rounded-lg mt-2">
                    {vehicle.liveryImageMetadata.title && (
                      <p className="font-bold text-navy text-sm">{vehicle.liveryImageMetadata.title}</p>
                    )}
                    {vehicle.liveryImageMetadata.description && (
                      <p className="text-navy-light text-xs">{vehicle.liveryImageMetadata.description}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Actions</h2>
            <div className="space-y-3">
              {isLoggedIn && <Link
                href={`/fleet/${vehicle.id}/edit`}
                className="block w-full bg-navy text-cream px-4 py-2 rounded-lg hover:bg-navy-light transition-colors text-center"
              >
                Edit Vehicle
              </Link>}
              <Link
                href={`/fleet/${vehicle.id}/add-review`}
                className="block w-full bg-navy-light text-cream px-4 py-2 rounded-lg hover:bg-navy transition-colors text-center"
              >
                Add Review
              </Link>
              <button type="button" onClick={() => window.print()} className="block w-full bg-cream-dark text-navy px-4 py-2 rounded-lg hover:bg-cream transition-colors text-center">
                Print Vehicle
              </button>
              {isLoggedIn && <DeleteButton endpoint={`/api/vehicles/${vehicle.id}`} label="vehicle" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
