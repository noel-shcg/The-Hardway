'use client';

import { useState } from 'react';

interface ImageMetadataProps {
  url: string;
  title?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
}

interface ImageUploadWithMetadataProps {
  onUpload: (metadata: ImageMetadataProps) => void;
  existingMetadata?: ImageMetadataProps;
  onRemove?: () => void;
  label: string;
}

export default function ImageUploadWithMetadata({
  onUpload,
  existingMetadata,
  onRemove,
  label,
}: ImageUploadWithMetadataProps) {
  const [uploading, setUploading] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [metadata, setMetadata] = useState<ImageMetadataProps>(
    existingMetadata || { url: '' }
  );
  const [dragging, setDragging] = useState(false);

  const handleFileUpload = async (input: File | React.ChangeEvent<HTMLInputElement>) => {
    const file = input instanceof File ? input : input.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'vehicles');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      setMetadata({ ...metadata, url: data.url });
      setShowMetadata(true);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onUpload(metadata);
    setShowMetadata(false);
  };

  const handleRemove = () => {
    setMetadata({ url: '' });
    setShowMetadata(false);
    if (onRemove) onRemove();
  };

  return (
    <div className="space-y-4">
      <label className="block text-navy font-medium mb-2">{label}</label>
      
      {!metadata.url ? (
        <div
          className={`border-2 border-dashed border-navy-light rounded-lg p-6 text-center ${dragging ? 'bg-cream-dark' : ''}`}
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); const file = event.dataTransfer.files[0]; if (file) handleFileUpload(file); }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleFileUpload(event)}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${label}`}
          />
          <label
            htmlFor={`file-upload-${label}`}
            className="cursor-pointer"
          >
            {uploading ? (
              <p className="text-navy-light">Uploading...</p>
            ) : (
              <div>
                <p className="text-navy font-medium">Click to upload image</p>
                <p className="text-sm text-navy-light">or drag and drop</p>
              </div>
            )}
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <img src={metadata.url} alt={label} className="w-full h-48 object-cover rounded-lg" />
          
          {!showMetadata ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowMetadata(true)}
                className="bg-navy-light text-cream px-4 py-2 rounded-lg hover:bg-navy transition-colors"
              >
                Add Metadata
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-3 bg-cream-dark p-4 rounded-lg">
              <div>
                <label className="block text-navy font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={metadata.title || ''}
                  onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                  className="w-full p-2 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
              <div>
                <label className="block text-navy font-medium mb-1">Description</label>
                <textarea
                  value={metadata.description || ''}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  className="w-full p-2 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-navy font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={metadata.location || ''}
                    onChange={(e) => setMetadata({ ...metadata, location: e.target.value })}
                    className="w-full p-2 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                </div>
                <div>
                  <label className="block text-navy font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={metadata.date || ''}
                    onChange={(e) => setMetadata({ ...metadata, date: e.target.value })}
                    className="w-full p-2 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                </div>
              </div>
              <div>
                <label className="block text-navy font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={metadata.time || ''}
                  onChange={(e) => setMetadata({ ...metadata, time: e.target.value })}
                  className="w-full p-2 border border-navy-light rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-navy text-cream px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowMetadata(false)}
                  className="bg-cream-dark text-navy px-4 py-2 rounded-lg hover:bg-cream transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
