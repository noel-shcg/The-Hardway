'use client';

import { useState } from 'react';
import { ImageMetadata } from '@/types';

interface EditPhotoMetadataProps {
  photo: ImageMetadata;
  index: number;
  onUpdate: (index: number, metadata: ImageMetadata) => void;
}

export default function EditPhotoMetadata({ photo, index, onUpdate }: EditPhotoMetadataProps) {
  const [editing, setEditing] = useState(false);
  const [metadata, setMetadata] = useState<ImageMetadata>(photo);

  const handleSave = () => {
    onUpdate(index, metadata);
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-xs text-navy-light hover:text-navy underline"
      >
        Edit Metadata
      </button>
    );
  }

  return (
    <div className="bg-cream-dark p-3 rounded-lg space-y-2">
      <div>
        <label className="block text-navy font-medium text-xs mb-1">Title</label>
        <input
          type="text"
          value={metadata.title || ''}
          onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
          className="w-full p-2 border border-navy-light rounded text-sm focus:outline-none focus:ring-2 focus:ring-navy"
        />
      </div>
      <div>
        <label className="block text-navy font-medium text-xs mb-1">Description</label>
        <textarea
          value={metadata.description || ''}
          onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
          className="w-full p-2 border border-navy-light rounded text-sm focus:outline-none focus:ring-2 focus:ring-navy"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-navy font-medium text-xs mb-1">Location</label>
          <input
            type="text"
            value={metadata.location || ''}
            onChange={(e) => setMetadata({ ...metadata, location: e.target.value })}
            className="w-full p-2 border border-navy-light rounded text-sm focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>
        <div>
          <label className="block text-navy font-medium text-xs mb-1">Date</label>
          <input
            type="date"
            value={metadata.date || ''}
            onChange={(e) => setMetadata({ ...metadata, date: e.target.value })}
            className="w-full p-2 border border-navy-light rounded text-sm focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>
      </div>
      <div>
        <label className="block text-navy font-medium text-xs mb-1">Time</label>
        <input
          type="time"
          value={metadata.time || ''}
          onChange={(e) => setMetadata({ ...metadata, time: e.target.value })}
          className="w-full p-2 border border-navy-light rounded text-sm focus:outline-none focus:ring-2 focus:ring-navy"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-navy text-cream px-3 py-1 rounded text-sm hover:bg-navy-light transition-colors"
        >
          Save
        </button>
        <button
          onClick={() => setEditing(false)}
          className="bg-cream-dark text-navy px-3 py-1 rounded text-sm hover:bg-cream transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
