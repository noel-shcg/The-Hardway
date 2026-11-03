import { getVehicleById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DeleteReviewButton from '@/components/DeleteReviewButton';

const statusColors = {
  'service-worthy': 'bg-green-500',
  'off-road': 'bg-orange-500',
  'away': 'bg-gray-500',
  'trainer': 'bg-yellow-500',
  'auxillary': 'bg-blue-500',
};

export default function VehicleDetail({ params }: { params: { id: string } }) {
  const vehicle = getVehicleById(params.id);

  if (!vehicle) {
    notFound();
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
        <img
          src={vehicle.primaryPhoto}
          alt={`Vehicle ${vehicle.fleetNumber}`}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicle.photoAlbum.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-navy mb-4">Reviews</h2>
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
                        <DeleteReviewButton vehicleId={vehicle.id} reviewId={review.id} />
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
              <div className="aspect-[38/26] overflow-hidden rounded-lg">
                <img
                  src={vehicle.liveryImage}
                  alt={`${vehicle.livery} livery`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Actions</h2>
            <div className="space-y-3">
              <Link
                href={`/fleet/${vehicle.id}/edit`}
                className="block w-full bg-navy text-cream px-4 py-2 rounded-lg hover:bg-navy-light transition-colors text-center"
              >
                Edit Vehicle
              </Link>
              <Link
                href={`/fleet/${vehicle.id}/add-review`}
                className="block w-full bg-navy-light text-cream px-4 py-2 rounded-lg hover:bg-navy transition-colors text-center"
              >
                Add Review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
