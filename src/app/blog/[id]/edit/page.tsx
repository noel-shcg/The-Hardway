'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getVehicles, getBlogPostById, updateBlogPost } from '@/lib/client-data';

export const dynamic = 'force-dynamic';

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const [vehicles, setVehicles] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    headerImage: '',
    body: '',
    author: '',
    linkedVehicleId: '',
    photoAlbum: [] as string[],
  });

  const [newPhoto, setNewPhoto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [post, vehicleList] = await Promise.all([
        getBlogPostById(params.id as string),
        getVehicles(),
      ]);
      if (post) {
        setFormData({
          title: post.title,
          headerImage: post.headerImage,
          body: post.body,
          author: post.author,
          linkedVehicleId: post.linkedVehicleId || '',
          photoAlbum: post.photoAlbum,
        });
      }
      setVehicles(vehicleList);
      setLoading(false);
    };
    loadData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBlogPost(params.id as string, formData);
    router.push(`/blog/${params.id}`);
  };

  const addPhoto = () => {
    if (newPhoto.trim()) {
      setFormData({ ...formData, photoAlbum: [...formData.photoAlbum, newPhoto.trim()] });
      setNewPhoto('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photoAlbum: formData.photoAlbum.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-navy mb-8">Edit Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-navy font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            required
          />
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Header Image URL</label>
          <input
            type="url"
            value={formData.headerImage}
            onChange={(e) => setFormData({ ...formData, headerImage: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            required
          />
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Link to Vehicle (Optional)</label>
          <select
            value={formData.linkedVehicleId}
            onChange={(e) => setFormData({ ...formData, linkedVehicleId: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          >
            <option value="">No vehicle linked</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.fleetNumber} - {vehicle.registration}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Body</label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="w-full p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy min-h-[300px]"
            required
          />
        </div>

        <div>
          <label className="block text-navy font-medium mb-2">Photo Album</label>
          <div className="flex gap-2 mb-2">
            <input
              type="url"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              className="flex-1 p-3 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              placeholder="Add photo URL"
            />
            <button
              type="button"
              onClick={addPhoto}
              className="bg-navy-light text-cream px-6 py-3 rounded-lg hover:bg-navy transition-colors"
            >
              Add
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {formData.photoAlbum.map((photo, index) => (
              <div key={index} className="relative">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full hover:bg-red-700 transition-colors"
                >
                  ×
                </button>
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
            onClick={() => router.push(`/blog/${params.id}`)}
            className="bg-cream-dark text-navy px-6 py-3 rounded-lg hover:bg-cream transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
