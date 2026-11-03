'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getVehicleById, updateVehicle } from '@/lib/client-data';
import { EmissionsRating, VehicleFeature, VehicleStatus, ImageMetadata } from '@/types';
import ImageUploadWithMetadata from '@/components/ImageUploadWithMetadata';
import BulkImageUpload from '@/components/BulkImageUpload';

export const dynamic = 'force-dynamic';

export default function EditVehicle() {
  const router = useRouter();
  const params = useParams();
  
  const [formData, setFormData] = useState({
    registration: '',
    fleetNumber: '',
    vehicleType: '',
    engineType: '',
    gearboxType: '',
    chassisType: '',
    livery: '',
    branding: '',
    emissionsRating: 'euro 6' as EmissionsRating,
    features: [] as VehicleFeature[],
    history: '',
    vehicleDelivered: '',
    vehicleJoinedFleet: '',
    status: 'service-worthy' as VehicleStatus,
    primaryPhoto: '',
    primaryPhotoMetadata: undefined as ImageMetadata | undefined,
    photoAlbum: [] as ImageMetadata[],
    liveryImage: '',
    liveryImageMetadata: undefined as ImageMetadata | undefined,
    featured: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const vehicle = await getVehicleById(params.id as string);
      if (vehicle) {
        setFormData({
          registration: vehicle.registration,
          fleetNumber: vehicle.fleetNumber,
          vehicleType: vehicle.vehicleType,
          engineType: vehicle.engineType,
          gearboxType: vehicle.gearboxType,
          chassisType: vehicle.chassisType,
          livery: vehicle.livery,
          branding: vehicle.branding,
          emissionsRating: vehicle.emissionsRating,
          features: vehicle.features,
          history: vehicle.history,
          vehicleDelivered: vehicle.vehicleDelivered,
          vehicleJoinedFleet: vehicle.vehicleJoinedFleet,
          status: vehicle.status,
          primaryPhoto: vehicle.primaryPhoto,
          primaryPhotoMetadata: vehicle.primaryPhotoMetadata,
          photoAlbum: vehicle.photoAlbum.map((p: ImageMetadata | string) => typeof p === 'string' ? { url: p } : p),
          liveryImage: vehicle.liveryImage,
          liveryImageMetadata: vehicle.liveryImageMetadata,
          featured: vehicle.featured || false,
        });
      }
      setLoading(false);
    };
    loadData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateVehicle(params.id as string, {
      ...formData,
      photoAlbum: formData.photoAlbum.map(p => typeof p === 'string' ? { url: p } : p)
    });
    router.push(`/fleet/${params.id}`);
  };

  const toggleFeature = (feature: VehicleFeature) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter(f => f !== feature)
        : [...formData.features, feature],
    });
  };

  const handlePrimaryPhotoUpload = (metadata: ImageMetadata) => {
    setFormData({
      ...formData,
      primaryPhoto: metadata.url,
      primaryPhotoMetadata: metadata,
    });
  };

  const handleLiveryImageUpload = (metadata: ImageMetadata) => {
    setFormData({
      ...formData,
      liveryImage: metadata.url,
      liveryImageMetadata: metadata,
    });
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photoAlbum: formData.photoAlbum.filter((_, i) => i !== index),
    });
  };

  const movePhoto = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= formData.photoAlbum.length) return;
    const photoAlbum = [...formData.photoAlbum];
    [photoAlbum[index], photoAlbum[target]] = [photoAlbum[target], photoAlbum[index]];
    setFormData({ ...formData, photoAlbum });
  };

  const features: VehicleFeature[] = [
    'USB-A', 'USB-C', 'WiFi', 'announcements', 'flip-dot internal screens', 'TV internal screens'
  ];

  const emissionsRatings: EmissionsRating[] = [
    'euro 1', 'euro 2', 'euro 3', 'euro 4', 'euro 5', 'euro 6', 'zero emissions'
  ];

  const statuses: VehicleStatus[] = [
    'service-worthy', 'off-road', 'away', 'trainer', 'auxillary'
  ];

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-navy mb-8">Edit Vehicle</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-navy font-medium mb-2">Registration</label>
            <input
              type="text"
              value={formData.registration}
              onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
          <div>
            <label className="block text-navy font-medium mb-2">Fleet Number</label>
            <input
              type="text"
              value={formData.fleetNumber}
              onChange={(e) => setFormData({ ...formData, fleetNumber: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-navy font-medium mb-2">Vehicle Type</label>
            <input
              type="text"
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
          <div>
            <label className="block text-navy font-medium mb-2">Engine Type</label>
            <input
              type="text"
              value={formData.engineType}
              onChange={(e) => setFormData({ ...formData, engineType: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-navy font-medium mb-2">Gearbox Type</label>
            <input
              type="text"
              value={formData.gearboxType}
              onChange={(e) => setFormData({ ...formData, gearboxType: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
          <div>
            <label className="block text-navy font-medium mb-2">Chassis Type</label>
            <input
              type="text"
              value={formData.chassisType}
              onChange={(e) => setFormData({ ...formData, chassisType: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-navy font-medium mb-2">Livery</label>
            <input
              type="text"
              value={formData.livery}
              onChange={(e) => setFormData({ ...formData, livery: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
          <div>
            <label className="block text-navy font-medium mb-2">Branding</label>
            <input
              type="text"
              value={formData.branding}
              onChange={(e) => setFormData({ ...formData, branding: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-navy font-medium mb-2">Emissions Rating</label>
            <select
              value={formData.emissionsRating}
              onChange={(e) => setFormData({ ...formData, emissionsRating: e.target.value as EmissionsRating })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            >
              {emissionsRatings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating.charAt(0).toUpperCase() + rating.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-navy font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as VehicleStatus })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-navy font-medium mb-2">Vehicle Delivered</label>
            <input
              type="date"
              value={formData.vehicleDelivered}
              onChange={(e) => setFormData({ ...formData, vehicleDelivered: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          <div>
            <label className="block text-navy font-medium mb-2">Joined Fleet</label>
            <input
              type="date"
              value={formData.vehicleJoinedFleet}
              onChange={(e) => setFormData({ ...formData, vehicleJoinedFleet: e.target.value })}
              className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Features</label>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  formData.features.includes(feature)
                    ? 'bg-navy text-cream'
                    : 'bg-cream-dark text-navy hover:bg-cream'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-navy font-medium">
            <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
            Feature this vehicle
          </label>
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">History</label>
          <textarea
            value={formData.history}
            onChange={(e) => setFormData({ ...formData, history: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy min-h-[150px]"
          />
        </div>

        <ImageUploadWithMetadata
          label="Primary Photo"
          onUpload={handlePrimaryPhotoUpload}
          existingMetadata={formData.primaryPhotoMetadata}
        />

        <ImageUploadWithMetadata
          label="Livery Image"
          onUpload={handleLiveryImageUpload}
          existingMetadata={formData.liveryImageMetadata}
        />

        <div>
          <label className="block text-navy font-medium mb-2">Photo Album</label>
          <BulkImageUpload onUploaded={(images) => setFormData({ ...formData, photoAlbum: [...formData.photoAlbum, ...images] })} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {formData.photoAlbum.map((photo, index) => (
              <div key={index} className="relative">
                <img src={photo.url} alt={photo.title || `Photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                {photo.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-navy bg-opacity-75 text-cream text-xs p-1 truncate">
                    {photo.title}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full hover:bg-red-700 transition-colors"
                >
                  ×
                </button>
                <div className="absolute bottom-1 left-1 flex gap-1">
                  <button type="button" disabled={index === 0} onClick={() => movePhoto(index, -1)} className="bg-white/90 text-navy rounded px-2 disabled:opacity-40">←</button>
                  <button type="button" disabled={index === formData.photoAlbum.length - 1} onClick={() => movePhoto(index, 1)} className="bg-white/90 text-navy rounded px-2 disabled:opacity-40">→</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-navy text-cream px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
          >
            Save Changes
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
